import useUserHasCapability from '../../../hooks/users/useUserHasCapability';
import AdminViewSwitch from './AdminViewSwitch';

const NavFooter = ({children=null, isSlim=null}) => {

  const { userHasCapability } = useUserHasCapability()

  return (
      <div id="navFooter" className={`z-50 static flex bottom-0 overflow-x-hidden transition-width ${isSlim ? 'w-16' : 'w-60'}`}>
        {children}
        { userHasCapability([
          'UpdateUser',
          'UpdateCourse',
          'UpdateResource',
          'EnrolUsersInContent'
        ]) && (
          <AdminViewSwitch />
        )}
      </div>
  )
}
export default NavFooter
