import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import MessagingSidebar from '../components/messaging/MessagingSidebar';
import { useEffect } from 'react';
import { resetViewStore, useViewStore } from '../hooks/useViewStore';

export default function MessagingLayout( {page, navState} ) {
  
  useEffect(() => {
    useViewStore.setState({
      isSlimNav: true,
      showSecondaryNav: false,
    })
    return resetViewStore()
  },[])

  return (
    <Layout page={page} navState={navState}>
      <div className="w-full h-[calc(100%-4.5rem)] mx-auto bg-main-superlight">
        <div className="lg:flex h-full">
          <div id="content-wrapper" className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible flex h-full">
            <ToastContainer />
            <div className="sticky top-18 h-[calc(100vh-4.5rem)] w-96 bg-main bg-opacity-10 flex flex-col scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-auto">
              <MessagingSidebar />
            </div>
            <div className="w-full flex justify-center px-16">
              <div className="min-w-0 w-full flex-auto pt-4 pb-24 lg:pb-16">
                {page}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
