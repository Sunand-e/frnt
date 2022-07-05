import { useReactiveVar } from '@apollo/client'
import Header from '../components/header/Header'
import NavContainer from '../components/navigation/NavContainer'
import TopNotificationBar from '../components/TopNotificationBar'

export default function Layout( {page, children, navState, sidebarComponent=null} ) {
  const SidebarComponent = sidebarComponent;
  return (
    <>
      <TopNotificationBar />
      <div className={`flex min-h-full`}>
        <NavContainer page={page} navState={navState} />
        { SidebarComponent && <SidebarComponent /> }
        <div className="flex-grow">
          <Header />
          { children }
        </div>
      </div>
    </>
  )
}
