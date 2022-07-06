import {useContext, useEffect} from 'react'
import Head from 'next/head'
import { useQuery, useReactiveVar } from '@apollo/client';
import usePageTitle from '../hooks/usePageTitle'
import useLogout from '../hooks/useLogout'
import PageContent from '../components/PageContent';
import { headerButtonsVar, latestContentVar, libraryVar, viewVar } from '../graphql/cache';
import { GET_DASHBOARD } from '../graphql/queries/GET_DASHBOARD';
import { useRouter } from 'next/router'
import Button from '../components/Button';
import { QueriesContext } from '../context/QueriesContext';
import Dashboard from '../components/dashboard/Dashboard';

// when the page has loaded, and all items have been loaded, 

// for each item, create the query for it's metadata.

// When the data from the initial query has been received, run the same query, but with metadata for all content types.

const DashboardPage = () => {
  // console.log(GET_DASHBOARD)
  const { loading, error, data } = useQuery(GET_DASHBOARD);
  // const library = useReactiveVar(libraryVar)

  usePageTitle({title: "Dashboard"})

  const {queries} = useContext(QueriesContext)
  
  useEffect(() => {
    console.log('queries')
    console.log(queries)
  },[queries])

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

  const { logout } = useLogout()

  const handleLogoutClick = (e) => {
    logout()
    e.target.blur()
  }

  useEffect(() => {

    headerButtonsVar(
      <>
        {/* <Button onClick={handleLogoutClick}>Log out</Button> */}
        <Button onClick={handleAdminButtonClick}>{`${view.isAdmin ? 'User' : 'Admin'} View`}</Button>
      </>
    )
  },[])
  
  useEffect(() => {
    if(data) {
      if(queries) {
        queries.getAllContent()
        queries.getLibrary()
      }
    }
  },[data, queries])
  
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
    e.preventDefault()
    router.push(`/library?tag=${tag.label}`, undefined, { shallow: true })
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
          <Dashboard />
        </div>
      </PageContent> 
    </>
  )
}

DashboardPage.navState = {
  topLevel: 'dashboard',
  // secondary: 'dashboard'
}

export default DashboardPage