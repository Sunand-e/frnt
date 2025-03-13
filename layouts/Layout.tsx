import { useRouter } from 'next/router'
import Header from '../components/app/header/Header'
import NavContainer from '../components/app/navigation/NavContainer'
import TopNotificationBar from '../components/common/TopNotificationBar'
import { useViewStore } from '../hooks/useViewStore'

export default function Layout({ children, navState, sidebarComponent = null }) {
  const mainScrollableRef = useViewStore(state => state.mainScrollableRef)
  
  const router = useRouter();
  const hideNavRoutes = ['/accept_invitation', '/reset-password', '/lost-password', '/sign_up', '/confirmation'];
  const isHideNavPage = hideNavRoutes.includes(router.pathname);

  return (
    <>
      <TopNotificationBar />
      <div className="flex min-h-full relative">
        {!isHideNavPage && (
          <NavContainer navState={navState} sidebarComponent={sidebarComponent} />
        )}
        <div className="grow main-right-block overflow-y-scroll" ref={mainScrollableRef}>
          <Header />
          {children}
        </div>
      </div>
    </>
  )
}
