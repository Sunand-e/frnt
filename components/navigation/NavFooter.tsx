import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react';
import { isLoggedInVar, viewVar } from '../../graphql/cache';
import { useReactiveVar } from '@apollo/client';
import { LogoutIcon } from '@heroicons/react/outline';
import useLogout from '../../hooks/useLogout';
import { applyTheme } from '../../themes/utils';
import baseTheme from '../../themes/base';
import darkTheme from '../../themes/dark';

const NavFooter = ({children, isSlim}) => {
  
  const view = useReactiveVar(viewVar)

  const handleAdminButtonClick = (e) => {
    viewVar({
      ...view,
      isAdmin: !view.isAdmin
    })
    e.target.blur()
  }

  const { logout } = useLogout()

  const handleLogoutClick = (e) => {
    logout()
    e.target.blur()
  }

  return (
    <div id="navFooter" className={`fixed bottom-0 overflow-visible transition-width ${isSlim ? 'w-16' : 'w-60'}`}>

      {children}

      <Tippy
        className="bg-white text-main p-3 w-60"
        interactive={true}
        hideOnClick={false}
        placement='top' // placement='right-start'
        theme="memberhub-white"
        content={
          <ul className="flex flex-col shadow-2 space-y-3">
            <li className="hover:text-main-dark cursor-pointer" onClick={() => applyTheme(baseTheme)}>Base theme</li>
            <li className="hover:text-main-dark cursor-pointer" onClick={() => applyTheme(darkTheme)}>Dark theme</li>
            <li className="hover:text-main-dark cursor-pointer" onClick={handleLogoutClick}>Log out</li>
            <li className="hover:text-main-dark cursor-pointer" onClick={handleAdminButtonClick}>
              <Link href={view.isAdmin ? '/' : '/admin'}>
                <a>
                  {`${view.isAdmin ? 'User' : 'Admin'} View`}
                </a>
              </Link>
            </li>
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