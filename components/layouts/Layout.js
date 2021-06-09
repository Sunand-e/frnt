import createContext from 'react'
import Footer from '../Footer'
import Header from '../Header'
import Menu2 from '../Menu-2'
import PageTitle from '../PageTitle'
import PageContent from '../PageContent'
import Sidebar from '../Sidebar'

// const SidebarContext = createContext();

export default function Layout( {page} ) {
  return (
    <div className="bg-white flex flex-col">
      <Header />
      <div className="bg-blue">
        <Menu2 />
      </div>
      <div className="flex-grow">
        {page}
      </div>
      <Footer />
    </div>
  )
}
