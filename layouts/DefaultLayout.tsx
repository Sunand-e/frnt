import { ToastContainer } from 'react-toastify';
import Layout from './Layout';

export default function DefaultLayout( {page, navState} ) {
  return (
    <Layout page={page} navState={navState}>
    <ToastContainer style={{ zIndex: 99999 }}/>
      <div className="w-full min-h-[calc(100%-4.5rem)] mx-auto bg-main-superlight relative" style={{zIndex:15}}>
        <div className="lg:flex min-h-[calc(100%-4.5rem)]">
          <div id="content-wrapper" className="min-h-[calc(100%-4.5rem)] min-w-0 w-full flex-auto max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 lg:static lg:max-h-full lg:overflow-visible pt-8">
            <div className="w-full flex justify-center">
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
