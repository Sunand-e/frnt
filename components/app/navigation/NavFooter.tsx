import useUserHasCapability from '../../../hooks/users/useUserHasCapability';
import AdminViewSwitch from './AdminViewSwitch';
import useVersionStore from "../../../stores/versionStore";
import { Refresh } from '@styled-icons/material/Refresh';

const NavFooter = ({ children = null }) => {

  const { userHasCapability } = useUserHasCapability()
  const { newVersion } = useVersionStore();

  const handleVersionUpdate = () => {
    fetch(window.location.href, { cache: "reload" })
    location.reload()
  }

  return (
    <div id="navFooter" className='z-50 static flex flex-col bottom-0 overflow-x-hidden transition-width'>
      {children}
      {newVersion && (
        <button onClick={() => { handleVersionUpdate() }} >
          <div className={`overflow-hidden text-main h-12 flex items-center px-4 transition-colors duration-100 text-base`}>
            <div className={`rounded-full flex-none w-8 h-8 flex items-center justify-center mr-4`}>
              <Refresh size={24} />
            </div>
            <span className="text-sm">
              New Update Available
            </span>
          </div>
        </button>
      )}
      {userHasCapability([
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
