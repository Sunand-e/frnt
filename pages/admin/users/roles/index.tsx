import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../../hooks/usePageTitle';
import Button from '../../../../components/Button';
import useHeaderButtons from '../../../../hooks/useHeaderButtons';
import { ModalContext } from '../../../../context/modalContext';
import AddRoleModal from '../../../../components/admin/roles/AddRoleModal';
import RolesTable from '../../../../components/admin/roles/RolesTable/RolesTable';

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
    ['Add new role', () => handleNewRoleButton()]
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