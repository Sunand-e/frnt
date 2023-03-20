import {useEffect} from 'react'
import Head from 'next/head'
import { useReactiveVar } from '@apollo/client';
import usePageTitle from '../hooks/usePageTitle'
import useLogout from '../hooks/useLogout'
import { headerButtonsVar, libraryVar, viewVar } from '../graphql/cache';
import { useRouter } from 'next/router'
import Button from '../components/common/Button';
import Dashboard from '../components/dashboard/Dashboard';
import WelcomeUserPanel from "../components/dashboard/WelcomeUserPanel";
import DashboardLayout from '../layouts/DashboardLayout';
import useUserHasCapability from '../hooks/users/useUserHasCapability';
import ActAsUser from '../components/ActAsUser';

// when the page has loaded, and all items have been loaded, 

// for each item, create the query for it's metadata.

// When the data from the initial query has been received, run the same query, but with metadata for all content types.

const DashboardPage = () => {
  // console.log(GET_DASHBOARD)
  // const { loading, error, data } = useQuery(GET_DASHBOARD);
  // const library = useReactiveVar(libraryVar)

  usePageTitle({title: "Dashboard"})

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
    router.push('admin')
    e.target.blur()
  }

  const { logout } = useLogout()

  const handleLogoutClick = (e) => {
    logout()
    e.target.blur()
  }

  const { userHasCapability, userCapabilityArray } = useUserHasCapability()

  useEffect(() => {
    if(userHasCapability([
      'UpdateUser',
      'UpdateCourse',
      'UpdateResource',
    ])) {
      headerButtonsVar(
        <>
          {/* <Button onClick={handleLogoutClick}>Log out</Button> */}
          <Button onClick={handleAdminButtonClick}>{`${view.isAdmin ? 'User' : 'Admin'} View`}</Button>
          <ActAsUser />
        </>
      )
    }
  },[userHasCapability])
  
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
      <WelcomeUserPanel />
      <div className="grow ">
        <Dashboard />
      </div>
    </>
  )
}

DashboardPage.navState = {
  topLevel: 'dashboard',
  // secondary: 'dashboard'
}

DashboardPage.getLayout = page => (
  <DashboardLayout
    navState={DashboardPage.navState || {}}
    page={page}
  />
)

export default DashboardPage
