import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react';
import { viewVar } from '../../../graphql/cache';
import { useReactiveVar } from '@apollo/client';
import useLogout from '../../../hooks/useLogout';
import useUserHasCapability from '../../../hooks/users/useUserHasCapability';

const SettingsMenuAndButton = () => {

  const view = useReactiveVar(viewVar)

  const handleAdminButtonClick = (e) => {
    e.target.blur()
  }

  const { logout } = useLogout()

  const { userHasCapability } = useUserHasCapability()
  const handleLogoutClick = (e) => {
    logout()
    e.target.blur()
  }

  return (
    <Tippy
        className="bg-white text-main p-3 w-60"
        interactive={true}
        appendTo={document.body}
        hideOnClick={false}
        placement='top' // placement='right-start'
        theme="memberhub-white"
        content={
          <ul className="flex flex-col shadow-2 space-y-3">
            {/* <li className="hover:text-main-secondary cursor-pointer" onClick={() => applyTheme(baseTheme)}>Base theme</li>
            <li className="hover:text-main-secondary cursor-pointer" onClick={() => applyTheme(darkTheme)}>Dark theme</li> */}
            <li className="hover:text-main-secondary cursor-pointer" onClick={handleLogoutClick}>Log out</li>
            { userHasCapability([
              'UpdateUser',
              'UpdateCourse',
              'UpdateLibraryItem',
              'GetUsers',
            ]) && (
              <li className="hover:text-main-secondary cursor-pointer" onClick={handleAdminButtonClick}>
                <Link href={view.isAdmin ? '/' : '/admin'}>
                  <a>
                    {`${view.isAdmin ? 'User' : 'Admin'} View`}
                  </a>
                </Link>
              </li>
            ) }
          </ul>
        }
    >
      <div
          // href={item.urlPath}
          className={`overflow-hidden text-main h-12 flex items-center px-4 transition-colors duration-100 text-base`}
      >
        <div className={`rounded-full flex-none w-8 h-8 flex items-center justify-center mr-4`}>
          <FontAwesomeIcon className="text-xl" icon={{prefix: 'fas', iconName: 'cog'}} />
        </div>
        <span className="mr-8">
          Settings
        </span>
      </div>
    </Tippy>
  )
}
export default SettingsMenuAndButton
