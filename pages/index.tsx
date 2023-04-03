import Head from 'next/head'
import usePageTitle from '../hooks/usePageTitle'
import Dashboard from '../components/dashboard/Dashboard';
import WelcomeUserPanel from "../components/dashboard/WelcomeUserPanel";
import DashboardLayout from '../layouts/DashboardLayout';

const DashboardPage = () => {

  usePageTitle({title: "Dashboard"})

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