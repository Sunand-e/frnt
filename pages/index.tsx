import {useEffect} from 'react'
import Head from 'next/head'
import { useQuery, useMutation, gql, useReactiveVar } from '@apollo/client';
import NoticeBox from '../components/NoticeBox';
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
import InnerNav from '../components/InnerNav';
import Button from '../components/Button';

import ItemCollection from "../components/ItemCollection";

// when the page has loaded, and all items have been loaded, 

// for each item, create the query for it's metadata.

// When the data from the initial query has been received, run the same query, but with metadata for all content types.

const Dashboard = ({queries}) => {
  // console.log(GET_DASHBOARD)
  const { loading, error, data } = useQuery(GET_DASHBOARD);
  // const library = useReactiveVar(libraryVar)
  
  const items = useReactiveVar(latestContentVar)

  const recentlyViewedOptions = { 
    heading: 'Recently Viewed',
    // subHeading: 'Courses and workshops that were recently released',
    maxItems: 5,
    itemOptions: {
      showType: true
    }
  }

  useEffect(() => {
    if(data) {
      const serializedState = client.cache.extract()
      contentTagsVar(
        Object.values(serializedState).filter(
          item => item.__typename === 'ContentTag'
        )
      )
      latestContentVar(data.contentItems.slice(0, 4))
      // console.log('data')
      // console.log(data)
      queries.getAllContent()
      queries.getLibrary()
    }
  },[data])
  
  if (error) {
    return (
      <>
        <p>Error:</p>
        <pre>
          {JSON.stringify(error, undefined, 2)}
        </pre>
      </>
    )
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
      
      <PageTitle title='Dashboard' />
      
      {/* <InnerNav /> */}
      
      <PageContent>
        <div className="flex-grow ">
          <NoticeBox>
            <div className="flex justify-between items-center">
             <h1 className="font-bold text-lg"><span>Pick up where you left off:</span> <em className="text-main">Know your why</em></h1>
             <Button>Start now</Button>
            </div>
          </NoticeBox>

          { items.length && (
            <ItemCollection
            // viewAll={() => setSearchParams(viewAllParams)} 
              items={items} 
              options={recentlyViewedOptions}
             />
          )}

          <div className="flex space-x-8 mb-8">

            {/* 'Coming Up' events list */}
            <div className="flex-1">
              <h3 className="text-xl text-blue-dark text-semibold">Coming Up</h3>
              { data ? 
                <ItemGrid
                items = {
                  data.events?.slice(0,3) || []
                }
                options={{display: 'list'}}
                />
                :
                <LoadingSpinner />
              }
            </div>

            {/* 'Latest News' list */}
            <div className="flex-1">
              <h3 className="text-xl text-blue-dark text-semibold">Latest News</h3>
              { data ? 
                <ItemGrid
                items = {
                  data.posts?.slice(0,3) || []
                }
                options={{display: 'list'}}
                />
                :
                <LoadingSpinner />
              }
            </div>
          </div>

          <TopicsList onTopicClick={handleTopicClick} />
          
          {/* Dashboard Content Tabs include 'Recently viewed' and 'continiue wathcing' sections */}
          <DashboardContentTabs />

        </div>
      </PageContent> 
    </>
  )
}

Dashboard.navState = {
  topLevel: 'dashboard',
  // secondary: 'dashboard'
}

export default Dashboard
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