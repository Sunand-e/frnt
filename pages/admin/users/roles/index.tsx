import usePageTitle from '../../../../hooks/usePageTitle';
import useHeaderButtons from '../../../../hooks/useHeaderButtons';
import AddRoleModal from '../../../../components/roles/AddRoleModal';
import RolesTable from '../../../../components/roles/RolesTable/RolesTable';
import { handleModal } from '../../../../stores/modalStore';
import ButtonAdd from '../../../../components/common/ButtonAdd';

const AdminUsersRoles = () => {
  
  usePageTitle({ title: 'User Roles' })
  
  const handleNewRoleButton = (roleType=null) => {
    handleModal({
      title: `Add a new role`,
      size: 'lg',
      content: <AddRoleModal type={roleType} />
    })
  }

  useHeaderButtons({
    id: 'createRole',
    component: <ButtonAdd action={handleNewRoleButton} text='Create new role' />
  })
  
  return (
    <RolesTable />
  )
}

AdminUsersRoles.navState = {
topLevel: 'users',
secondary: 'roles'
}

export default AdminUsersRoles
