import useLogout from '../../../hooks/useLogout';
import useView from '../../../hooks/useView';
import useUserHasCapability from '../../../hooks/users/useUserHasCapability';
import useGetCurrentUser from '../../../hooks/users/useGetCurrentUser';
import { User } from 'styled-icons/fa-solid';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import MenuComponent from '../../common/menus/MenuComponent';
import { Menu } from '@headlessui/react';

const ProfileWidget = () => {
  const { logout } = useLogout()

  const handleLogoutClick = (e) => {
    logout()
    e.target.blur()
  }

  const { view } = useView()

  // const { loading, error, data, refetch } = useQuery<GetUser>(GET_USER);
  const { loading, error, user } = useGetCurrentUser()
  const { userHasCapability } = useUserHasCapability()

  const menuItems = [
    { label: 'Profile', href: '/profile' },
    // { label: 'Settings', href:'settings' },
    ...(userHasCapability([
      'UpdateUser',
      // 'UpdateCourse',
      // 'UpdateResource',
      'GetUsers',
    ]) ? [{ 
      label: `${view.isAdmin ? 'User' : 'Admin'} View`, 
      href: view.isAdmin ? '/' : '/admin', 
      // onClick: toggleIsAdmin
    }] : []),
    { label: 'Log out', onClick: handleLogoutClick }
  ]

  const button = (
    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
      <div className='h-8 w-8'>
        { user?.profileImageUrl ? (
          <img
            className="h-8 w-8 hidden object-cover rounded-full sm:block"
            src={user.profileImageUrl}
            alt=""
          />
        ) : (
          <User className="hidden w-auto h-full rounded-full bg-grey-500 text-main-secondary text-opacity-50" />
        )}
      </div>
      <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:flex flex-col items-start">
        <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-gray-900 whitespace-nowrap ">{user?.fullName || error?.message}</span>
        <Link href="/profile">
          <span className="flex-1 text-xs font-medium text-gray-500 group-hover:text-gray-700 whitespace-nowrap">View profile</span>
        </Link>
      </span>
      <ChevronDownIcon
        className="shrink-0 ml-1 h-5 w-5 text-gray-400 block"
        aria-hidden="true"
      />
    </Menu.Button>
  )

  return <>
    { user && (
      <div className='ml-3'>
        <MenuComponent
          menuItems={menuItems}
          button={button}
        />
      </div>
    )}
  </>;
}

export default ProfileWidget
