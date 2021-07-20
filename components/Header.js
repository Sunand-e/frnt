import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { isLoggedInVar, viewVar } from "../graphql/cache";
import Button from "./Button";

export default function Header() {

  const view = useReactiveVar(viewVar);

  const handleAdminButtonClick = (e) => {
    viewVar({
      ...view,
      isAdmin: !view.isAdmin
    })
    e.target.blur()
  }

  const handleLogoutClick = (e) => {
    isLoggedInVar(false)
    localStorage.removeItem('token')
    
    e.target.blur()

  }

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    setShowButtons(isLoggedIn)
  },[])


  return (
    <>
      <div className="sticky top-0 z-40 lg:z-50 w-full h-18 mx-auto bg-white flex bg-white shadow-sm justify-between">
        <div
            className="flex-none pl-4 sm:pl-6 xl:pl-8 flex items-center border-b border-gray-200 lg:border-b-0 lg:w-60 xl:w-72">
            <a className="overflow-hidden w-10 md:w-auto text-lg text-main-dark font-bold" href="/">
              <span className="sr-only">MemberHub Dashboard</span>
              
              {view.title}
              {/* {` isAdmin: ${view.isAdmin ? 'on' : 'off'}.`} */}
            </a>
        </div>
        <div
          className="flex items-center justify-between px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
          <div className="min-w-16 lg:w-64 pl-8 flex-shrink-0 flex items-center justify-end space-x-6">
            { 
              showButtons && 
              <>
                <Button onClick={handleLogoutClick}>Log out</Button>
                <Button onClick={handleAdminButtonClick}>{view.isAdmin ? 'Admin' : 'User'} View</Button>
              </>
}
          </div>
        </div>
      </div>
    <button type="button"
        className="fixed z-50 bottom-4 right-4 w-16 h-16 rounded-full bg-gray-900 text-white block lg:hidden"><span
            className="sr-only">Open site navigation</span><svg width="24" height="24" fill="none"
            className="absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform">
            <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round"></path>
        </svg><svg width="24" height="24" fill="none"
            className="absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform opacity-0 scale-80">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round"></path>
        </svg></button>
    </>
  )
}