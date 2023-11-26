import { useReactiveVar } from '@apollo/client'
import { useEffect } from 'react'
import Header from '../components/app/header/Header'
import NavContainer from '../components/app/navigation/NavContainer'
import TopNotificationBar from '../components/common/TopNotificationBar'
import { useViewStore } from '../hooks/useViewStore'

export default function Layout( {children, navState, sidebarComponent=null} ) {

  const mainScrollableRef = useViewStore(state => state.mainScrollableRef)

  return (
    <>
      <TopNotificationBar />
      <div className={`flex min-h-full relative`}>
        <NavContainer navState={navState} sidebarComponent={sidebarComponent} />
        {/* { SidebarComponent && <SidebarComponent /> } */}
        <div className="grow main-right-block" ref={mainScrollableRef}>
          <Header />
          { children }
        </div>
      </div>
    </>
  )
}
