import createContext from 'react'
import Footer from '../Footer'
import Header from '../Header'
import Navigation from '../Navigation'
import PageTitle from '../PageTitle'
import PageContent from '../PageContent'
import Sidebar from '../Sidebar'

// const SidebarContext = createContext();

export default function Layout( {page} ) {
  return (
    <>
      <Header />



          {page}
    </>
  )
}


