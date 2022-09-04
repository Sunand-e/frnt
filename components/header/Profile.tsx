import Link from 'next/link'
import Tippy from '@tippyjs/react';
import useLogout from '../../hooks/useLogout';
import useView from '../../hooks/useView';
import { GET_USER } from '../../graphql/queries/users';
import { GetUser } from '../../graphql/queries/__generated__/GetUser';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import classNames from '../../utils/classNames';
import {User} from '@styled-icons/fa-solid/User'

function NextLink(props) {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

const ProfileMenuItem = ({title = '', href='#', onClick=null }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <NextLink href={href}>
          <a onClick={onClick} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
            {title}
          </a>
        </NextLink>
      )}
    </Menu.Item>
  )
}

const Profile = () => {
  const { logout } = useLogout()

  const handleLogoutClick = (e) => {
    logout()
    e.target.blur()
  }

  const { view, toggleIsAdmin } = useView()

  const USER_PROFILE = gql`
    query GetUserProfile {
      user {
        fullName
        profileImageUrl
        roles {
          name
        }
      }
    }
  `
  // const { loading, error, data, refetch } = useQuery<GetUser>(GET_USER);
  const { loading, error, data, refetch } = useQuery<GetUser>(USER_PROFILE);

  const menuItems = [
    { title: 'Profile', href:'profile' },
    // { title: 'Settings', href:'settings' },
    { 
      title: `${view.isAdmin ? 'User' : 'Admin'} View`, 
      href: view.isAdmin ? '/' : '/admin', 
      // onClick: toggleIsAdmin
    },
    { title: 'Log out', onClick: handleLogoutClick }
  ]
  return (
    <>
      {/* Profile dropdown */}
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
            <div className='h-8 w-8'>
            { data?.user?.profileImageUrl ? (
                <img
                  className="h-8 w-8 hidden object-cover rounded-full sm:block"
                  src={data.user.profileImageUrl}
                  alt=""
                />
              ): (
                <User className="hidden w-auto h-full rounded-full bg-grey-500 text-main-secondary text-opacity-50" />
              )}
            </div>
            <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:flex flex-col items-start">
              <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-gray-900 whitespace-nowrap ">{data?.user?.fullName || error?.message}</span>
              <Link href="profile">
                <a>
                  <span className="flex-1 text-xs font-medium text-gray-500 group-hover:text-gray-700 whitespace-nowrap">View profile</span>
                </a>
              </Link>
            </span>
            <ChevronDownIcon
              className="shrink-0 ml-1 h-5 w-5 text-gray-400 block"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            { menuItems.map((item, index) => (
              <ProfileMenuItem {...item} key={index} />
            )) }
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default Profile
