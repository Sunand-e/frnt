import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useLogout from '../../../hooks/useLogout';
import useUserHasCapability from '../../../hooks/users/useUserHasCapability';
import { useViewStore } from '../../../hooks/useViewStore';

const AdminViewSwitch = () => {

  const isAdminView = useViewStore(state => state.isAdminView)

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
      onClick={handleAdminButtonClick} href={isAdminView ? '/' : '/admin'}
    >
      <div className={`overflow-hidden text-main h-12 flex items-center px-4 transition-colors duration-100 text-base`}>
        <div className={`rounded-full flex-none w-8 h-8 flex items-center justify-center mr-4`}>
          <FontAwesomeIcon className="text-xl" icon={{prefix: 'fas', iconName: isAdminView ? 'user' : 'cog'}} />
        </div>
        <span className="mr-8">
          {`${isAdminView ? 'User' : 'Admin'} View`}
        </span>
      </div>
    </Link>
  );
}
export default AdminViewSwitch
