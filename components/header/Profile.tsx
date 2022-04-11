import Link from 'next/link'
import Tippy from '@tippyjs/react';
import useLogout from '../../hooks/useLogout';
import useView from '../../hooks/useView';
import { GET_USER } from '../../graphql/queries/allQueries';
import { GetUser } from '../../graphql/queries/__generated__/GetUser';
import { useQuery } from '@apollo/client';

const Profile = () => {
  const { logout } = useLogout()

  const handleLogoutClick = (e) => {
    logout()
    e.target.blur()
  }

  const { view, toggleIsAdmin } = useView()

  const { loading, error, data, refetch } = useQuery<GetUser>(GET_USER);

  // console.log('user')
  // console.log(user)
  return (
    <>
      <Tippy
        className="bg-white text-main p-3 w-60"
        interactive={true}
        hideOnClick={false}
        placement='top' // placement='right-start'
        theme="memberhub-white"
        content={
          <ul className="flex flex-col shadow-2 space-y-3">
            <li className="hover:text-main-dark cursor-pointer" onClick={handleLogoutClick}>Log out</li>
            <li className="hover:text-main-dark cursor-pointer" onClick={toggleIsAdmin}>
              <Link href={view.isAdmin ? '/' : '/admin'}>
                <a>
                  {`${view.isAdmin ? 'User' : 'Admin'} View`}
                </a>
              </Link>
            </li>
          </ul>
        }
      >
        <a href="#" className="flex-shrink-0 group block">  

          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3 flex flex-col align-center">
              <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-gray-900">{data?.user?.fullName || error?.message}</span>
              <span className="flex-1 text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</span>
              <span className="flex-1 text-xs font-medium text-gray-500 group-hover:text-gray-700">{ data?.user?.roles.map(role => role.name) }</span>
            </div>
          </div>
        </a>
      </Tippy>
      {/* <pre className='absolute bg-white/50'>
        {JSON.stringify(data, null,2)}
        {JSON.stringify(error, null,2)}
      </pre> */}
    </>
  )
}

export default Profile