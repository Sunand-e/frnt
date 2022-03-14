import {useEffect} from 'react'
import Head from 'next/head'
import { useQuery, useMutation, gql, useReactiveVar } from '@apollo/client';
import NoticeBox from '../components/NoticeBox';
import usePageTitle from '../hooks/usePageTitle'
import PageContent from '../components/PageContent';
import TopicsList from '../components/TopicsList';
import DashboardContentTabs from '../components/dashboard/DashboardContentTabs';
import { contentTagsVar, headerButtonsVar, isLoggedInVar, latestContentVar, libraryVar, viewVar } from '../graphql/cache';
import LoadingSpinner from '../components/LoadingSpinner';
import { GET_DASHBOARD } from '../graphql/queries/GET_DASHBOARD';
import { client } from "../graphql/client";
import contentTypes from '../contentTypes';
import { useRouter } from 'next/router'
import ItemGrid from '../components/common/items/ItemGrid';
import InnerNav from '../components/InnerNav';
import Button from '../components/Button';
import ItemCollection from "../components/common/items/ItemCollection";

// when the page has loaded, and all items have been loaded, 

// for each item, create the query for it's metadata.

// When the data from the initial query has been received, run the same query, but with metadata for all content types.

const Dashboard = ({queries}) => {
  // console.log(GET_DASHBOARD)
  const { loading, error, data } = useQuery(GET_DASHBOARD);
  // const library = useReactiveVar(libraryVar)

  usePageTitle({title: "Dashboard"})

  const items = useReactiveVar(latestContentVar)

  const recentlyViewedOptions = { 
    heading: 'Recently Viewed',
    // subHeading: 'Courses and workshops that were recently released',
    maxItems: 5,
    itemOptions: {
      showType: true
    }
  }
  
  const view = useReactiveVar(viewVar);
  
  const handleAdminButtonClick = (e) => {
    viewVar({
      ...view,
      isAdmin: !view.isAdmin
    })
    e.target.blur()
  }

  const handleLogoutClick = (e) => {
    isLoggedInVar(false)
    localStorage.removeItem('token')
    
    e.target.blur()
  }

  useEffect(() => {

    headerButtonsVar(
      <>
        <Button onClick={handleLogoutClick}>Log out</Button>
        <Button onClick={handleAdminButtonClick}>{`${view.isAdmin ? 'User' : 'Admin'} View`}</Button>
      </>
    )
  },[])
  
  useEffect(() => {
    if(data) {
      const serializedState = client.cache.extract()
      contentTagsVar(
        Object.values(serializedState).filter(
          item => item.__typename === 'ContentTag'
        )
      )

      if(data.libraryItems.length) {
        console.log('data.libraryItems')
        console.log(data.libraryItems)
      }

      // latestContentVar(data.libraryItems.slice(0, 4))
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
      
      {/* <InnerNav /> */}
      
      <PageContent>
        <div className="flex-grow ">

          <NoticeBox>
            <div className="flex justify-between items-center">
             <h1 className="font-bold text-lg"><span>Pick up where you left off:</span> <em className="text-main">Know your why</em></h1>
             <Button>Start now</Button>
            </div>
          </NoticeBox>
          { !!items?.length && (
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
        {/* <pre>
          { JSON.stringify(items,null,2)}
        </pre> */}
      </PageContent> 
    </>
  )
}

Dashboard.navState = {
  topLevel: 'dashboard',
  // secondary: 'dashboard'
}

export default Dashboard