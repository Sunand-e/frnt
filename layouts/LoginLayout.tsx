import { useState, useEffect } from 'react'
import TopNotificationBar from '../components/TopNotificationBar'
import LoginPage from '../components/LoginPage'
import { isLoggedInVar } from '../graphql/cache'
import { useReactiveVar } from '@apollo/client'

export default function LoginLayout( {page, navState, pageState} ) {

  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    setShowLogin(true)
  },[])

  const isLoggedIn = useReactiveVar(isLoggedInVar)
  return (
    <>
      <div className={`min-h-full bg-blue-superlight`}>
        <div className="fixed w-full">
          <TopNotificationBar />
        </div>
        <div className="flex-grow">
          {/* <Header pageState={pageState} /> */}
          <div className="w-full mx-auto">
            <div className="lg:flex">
              <div id="content-wrapper" className="min-w-0 w-full flex-auto lg:static lg:overflow-visible">
                <div className={`w-full flex items-center justify-center`}>
                    { showLogin && <LoginPage /> }
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
