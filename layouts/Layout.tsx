import { useReactiveVar } from '@apollo/client'
import Header from '../components/header/Header'
import NavContainer from '../components/navigation/NavContainer'
import TopNotificationBar from '../components/TopNotificationBar'

export default function Layout( {children, navState, sidebarComponent=null} ) {
  return (
    <>
      <TopNotificationBar />
      <div className={`flex min-h-full relative`}>
        <NavContainer navState={navState} sidebarComponent={sidebarComponent} />
        {/* { SidebarComponent && <SidebarComponent /> } */}
        <div className="flex-grow main-right-block">
          <Header />
          { children }
        </div>
      </div>
    </>
  )
}
