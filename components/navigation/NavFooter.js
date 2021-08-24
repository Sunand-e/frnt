import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react';
import { viewVar } from '../../graphql/cache';
import { useReactiveVar } from '@apollo/client';

const NavFooter = ({children, showSecondary}) => {
  
  const view = useReactiveVar(viewVar)

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

  return (
    <div id="navFooter" className={`fixed bottom-0 overflow-visible transition-width ${showSecondary ? 'w-16' : 'w-60'}`}>

      {children}

      <Tippy
        className="bg-white text-main p-2 cursor-pointer w-60"
        interactive={true}
        hideOnClick={false}
        placement='top' // placement='right-start'
        theme="memberhub-white"
        content={
          <ul className="flex flex-col">
            <li onClick={handleLogoutClick}>Log out</li>
            <li onClick={handleAdminButtonClick}>{`${view.isAdmin ? 'User' : 'Admin'} View`}</li>
          </ul>
        }
      >
        <div
        // href={item.urlPath} 
          className={`overflow-hidden text-blue h-12 flex items-center px-4 transition-colors duration-100 text-base`}
        >
          <div className={`rounded-full flex-none w-8 h-8 flex items-center justify-center mr-4`}>
            <FontAwesomeIcon className="text-xl" icon={{prefix: 'fas', iconName: 'cog'}} />
          </div>
          <span className="mr-8">
            Settings
          </span>
        </div>
      </Tippy>
    </div>
  )
}
export default NavFooter