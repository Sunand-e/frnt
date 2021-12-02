import Header from '../components/header/Header'
import NavContainer from '../components/navigation/NavContainer'
import TopNotificationBar from '../components/TopNotificationBar'
import { ToastContainer } from 'react-toastify';

export default function Layout( {page, navState} ) {
  return (
    <>
      <TopNotificationBar />
      <div className={`flex min-h-full`}>
        <NavContainer navState={navState} />
        <div className="flex-grow">
          <Header />
          <div className="w-full min-h-[calc(100%-4.5rem)] mx-auto bg-blue-superlight">
            <ToastContainer />
            <div className="lg:flex">
              <div id="content-wrapper" className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
                <div className="w-full flex justify-center">
                  <div className="min-w-0 max-w-screen-2xl flex-auto pt-4 pb-24 lg:pb-16">
                    {page}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal><p>test</p></Modal> */}
    </>
  )
}
