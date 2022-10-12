import { useContext } from 'react'
import usePageTitle from '../../../../hooks/usePageTitle';
import useHeaderButtons from '../../../../hooks/useHeaderButtons';
import { ModalContext } from '../../../../context/modalContext';
import AddRoleModal from '../../../../components/roles/AddRoleModal';
import RolesTable from '../../../../components/roles/RolesTable/RolesTable';
import {Add} from "@styled-icons/fluentui-system-filled/Add";

const AddButton = () => (
  <>
    <span className='hidden lg:block'>Create new role</span>
    <span className='block lg:hidden'><Add  width="20" /></span>
  </>
)

const AdminUsersRoles = () => {
  
  usePageTitle({ title: 'User Roles' })

  const { handleModal } = useContext(ModalContext);
  
  const handleNewRoleButton = (roleType=null) => {
    handleModal({
      title: `Add a new role`,
      size: 'lg',
      content: <AddRoleModal type={roleType} />
    })
  }

  useHeaderButtons([
    [<AddButton />, () => handleNewRoleButton()]
  ])

  
  return (
    <>
    {/* <Button onClick=>Create new role</Button> */}
    <RolesTable />
    </>
  )
}

AdminUsersRoles.navState = {
topLevel: 'users',
secondary: 'roles'
}

export default AdminUsersRoles
