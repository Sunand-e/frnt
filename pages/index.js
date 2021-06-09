import {useEffect} from 'react'
import Head from 'next/head'
import { useQuery, useMutation, gql, useReactiveVar } from '@apollo/client';
import InfoBox from '../components/InfoBox';
import PageTitle from '../components/PageTitle';
import PageContent from '../components/PageContent';
import TopicsList from '../components/TopicsList';
import DashboardContentTabs from '../components/DashboardContentTabs';
import { contentTagsVar, latestContentVar, libraryVar } from '../graphql/cache';
import LoadingSpinner from '../components/LoadingSpinner';
import { GET_DASHBOARD } from '../graphql/queries/GET_DASHBOARD';
import { client } from './_app';
import contentTypes from '../contentTypes';
import { useRouter } from 'next/router'
import ItemGrid from '../components/ItemGrid';
// when the page has loaded, and all items have been loaded, 

// for each item, create the query for it's metadata.

// When the data from the initial query has been received, run the same query, but with metadata for all content types.

export default function Dashboard({queries}) {
  // console.log(GET_DASHBOARD)
  const { loading, error, data } = useQuery(GET_DASHBOARD);
  // const library = useReactiveVar(libraryVar)
  
  useEffect(() => {
    if(data) {
      const serializedState = client.cache.extract()
      contentTagsVar(
        Object.values(serializedState).filter(
          item => item.__typename === 'ContentTag'
        )
      )
      latestContentVar(data.contentNodes.nodes.slice(0, 3))
      // console.log('data')
      // console.log(data)
      queries.getAllContent()
      queries.getLibrary()
    }
  },[data])
  
  if (error) {
    return <p>Error :
      <pre>
      {JSON.stringify(error, undefined, 2)}
      </pre>
    </p>;
  }
  const router = useRouter()
  const handleTopicClick = tag => e => {
    // alert(e.target)
    e.preventDefault()
    router.push(`/library?tag=${tag.slug}`, undefined, { shallow: true })
    console.log( libraryVar() ) 
  }
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle
        title='Welcome to your Dashboard'
        subtitle='...where you can find the latest resources for your membership'
      />
      <PageContent>
        <div className="flex-grow ">
          <InfoBox>
            <h1><span className="uppercase">Pick  up where you left off:</span> <em className="text-mainw">Know your why</em></h1>
          </InfoBox>


          <div className="flex space-x-8 mb-8">
            <InfoBox className="flex-1">
              <h1><span className="uppercase">Coming Up</span></h1>
              { data ? 
                <ItemGrid
                  items = {
                    data.events.nodes.slice(0,3)
                  }
                  options={{display: 'list'}}
                />
                :
                <LoadingSpinner />
              }
            </InfoBox>

            <InfoBox className="flex-1">
              <h1><span className="uppercase">Latest News</span></h1>
              { data ? 
                <ItemGrid
                  items = {
                    data.posts.nodes.slice(0,3)
                  }
                  options={{display: 'list'}}
                />
                :
                <LoadingSpinner />
              }
            </InfoBox>
          </div>

          <TopicsList onTopicClick={handleTopicClick} />
          
          <DashboardContentTabs />

        </div>
      </PageContent> 
    </>
  )
}

/*
export async function getStaticProps() {

  const { data } = await client.query({
    query: gql`
      query GetLogin {
        posts {
          nodes {
            id
          }
        }
      }
    `
  });

  
  // const loginInfo = await client.query({
  //   mutation: gql`
  //     mutation LoginUser {
  //       login( input: {
  //         clientMutationId: "uniqueId",
  //         username: "your_login",
  //         password: "your password"
  //       } ) {
  //         authToken
  //         user {
  //           id
  //           name
  //         }
  //       }
  //     }
  //   `
  // })
  // const { data } = await client.query({
  //   query: gql`
  //     query GetLogin {
  //       viewer {
  //         email
  //       }
  //     }
  //   `
  // });

  return {
    props: {
      launches: data.posts.nodes
    }
  }
}
*/