import { useReactiveVar } from '@apollo/client'
import Header from '../components/header/Header'
import LoadingSpinner from '../components/LoadingSpinner'
import NavContainer from '../components/navigation/NavContainer'
import TopNotificationBar from '../components/TopNotificationBar'
import useGetUser from '../hooks/users/useGetUser'

export default function Layout( {children, navState, sidebarComponent=null} ) {

  const { user } = useGetUser()

  return (
    <>
      <TopNotificationBar />
      <div className={`flex min-h-full relative`}>
        <NavContainer navState={navState} sidebarComponent={sidebarComponent} />
        {/* { SidebarComponent && <SidebarComponent /> } */}
        <div className="grow main-right-block">
          <Header />
          { user ? children : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </>
  )
}
