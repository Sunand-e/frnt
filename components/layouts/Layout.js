import {createContext} from 'react'
import Footer from '../Footer'
import Header from '../Header'
import NavContainer from '../navigation/NavContainer'
import PageTitle from '../PageTitle'
import PageContent from '../PageContent'
import Sidebar from '../Sidebar'
import TopNotificationBar from '../TopNotificationBar'
import Modal from '../Modal'

export default function Layout( {page, navState} ) {
  return (
    <>
      <TopNotificationBar />
      <div className={`flex min-h-full`}>
        <NavContainer navState={navState} />
        <div className="flex-grow">
          <Header />
          <div className="w-full min-h-[calc(100%-4.5rem)] mx-auto bg-blue-superlight">
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
