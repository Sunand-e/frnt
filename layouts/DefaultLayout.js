import Header from '../components/header/Header'
import NavContainer from '../components/navigation/NavContainer'
import TopNotificationBar from '../components/TopNotificationBar'
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';

export default function DefaultLayout( {page, navState} ) {
  return (
    <Layout page={page} navState={navState}>
      <div className="w-full min-h-[calc(100%-4.5rem)] mx-auto bg-blue-superlight">
        <ToastContainer />
        <div className="lg:flex">
          <div id="content-wrapper" className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
            <div className="w-full flex justify-center py-2 px-4 sm:px-6 xl:px-8">
              <div className="min-w-0 max-w-screen-2xl flex-auto pt-4 pb-24 lg:pb-16">
                {page}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
