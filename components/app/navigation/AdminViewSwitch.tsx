import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react';
import { viewVar } from '../../../graphql/cache';
import { useReactiveVar } from '@apollo/client';
import useLogout from '../../../hooks/useLogout';
import useUserHasCapability from '../../../hooks/users/useUserHasCapability';

const AdminViewSwitch = () => {

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
    <Link
      onClick={handleAdminButtonClick} href={view.isAdmin ? '/' : '/admin'}
    >
      <div className={`overflow-hidden text-main h-12 flex items-center px-4 transition-colors duration-100 text-base`}>
        <div className={`rounded-full flex-none w-8 h-8 flex items-center justify-center mr-4`}>
          <FontAwesomeIcon className="text-xl" icon={{prefix: 'fas', iconName: view.isAdmin ? 'user' : 'cog'}} />
        </div>
        <span className="mr-8">
          {`${view.isAdmin ? 'User' : 'Admin'} View`}
        </span>
      </div>
    </Link>
  );
}
export default AdminViewSwitch
