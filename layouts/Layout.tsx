import { useReactiveVar } from '@apollo/client'
import Header from '../components/app/header/Header'
import NavContainer from '../components/app/navigation/NavContainer'
import TopNotificationBar from '../components/common/TopNotificationBar'

export default function Layout( {children, navState, sidebarComponent=null} ) {
  return (
    <>
      <TopNotificationBar />
      <div className={`flex min-h-full relative`}>
        <NavContainer navState={navState} sidebarComponent={sidebarComponent} />
        {/* { SidebarComponent && <SidebarComponent /> } */}
        <div className="grow main-right-block">
          <Header />
          { children }
        </div>
      </div>
    </>
  )
}
