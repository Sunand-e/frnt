import usePageTitle from '../hooks/usePageTitle'
import Dashboard from '../components/dashboard/Dashboard';
import WelcomeUserPanel from "../components/dashboard/WelcomeUserPanel";
import DashboardLayout from '../layouts/DashboardLayout';

const DashboardPage = () => {

  usePageTitle({title: "Dashboard"})

  return (
    <>
      <WelcomeUserPanel />
      <div className="grow ">
        <Dashboard />
      </div>
    </>
  )
}

DashboardPage.navState = {
  topLevel: 'dashboard'
}

DashboardPage.getLayout = (page: any) => (
  <DashboardLayout
    navState={DashboardPage.navState || {}}
    page={page}
  />
)

export default DashboardPage