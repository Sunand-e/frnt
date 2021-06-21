import {createContext} from 'react'
import Footer from '../Footer'
import Header from '../Header'
import Navigation from '../Navigation'
import PageTitle from '../PageTitle'
import PageContent from '../PageContent'
import Sidebar from '../Sidebar'
import Llama from '../Header'
import { NavContextProvider } from '../../navContext'

export default function Layout( {page, navState} ) {
  return (
    <>
      <Header />
      <div className="w-full mx-auto bg-blue-superlight">
        <NavContextProvider>
          <div className="lg:flex">
              <Navigation navState={navState} />
              <div id="content-wrapper" className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
                  <div className="w-full flex">
                      <div className="min-w-0 flex-auto pt-4 pb-24 lg:pb-16">
                        {page}
                      </div>
                  </div>
              </div>
          </div>
        </NavContextProvider>
      </div>
    </>
  )
}
