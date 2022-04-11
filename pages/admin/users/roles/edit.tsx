import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../../../components/Button';
import usePageTitle from '../../../../hooks/usePageTitle';
import { ModalContext } from '../../../../context/modalContext';
import { useRouter } from '../../../../utils/router';
import useHeaderButtons from '../../../../hooks/useHeaderButtons';
import useGetRole from '../../../../hooks/roles/useGetRole';
import GroupUsersInput from '../../../../components/admin/groups/inputs/GroupUsersInput';
import RoleForm from '../../../../components/admin/roles/RoleForm';
import useUpdateRole from '../../../../hooks/roles/useUpdateRole';


const AdminUsersRolesEdit = () => {
  
  const router = useRouter()
  const { role, loading, error } = useGetRole(router.query.id)
  const { updateRole } = useUpdateRole(router.query.id)

  const handleSubmit = (values) => {
    updateRole(values)
    router.push('/admin/users/roles')
  }
  usePageTitle({ title: 'Edit Role' })

  useHeaderButtons([
    ['Back to roles list', '/admin/users/roles']
  ])

  console.log('role')
  console.log(role)
  return (
    <>
      { role &&
        <>
          <h3>
            Editing role: {role.name}
          </h3>
          <RoleForm onSubmit={handleSubmit} role={role} />
        </>
      }
    </>
  )
}

AdminUsersRolesEdit.navState = {
  topLevel: 'users',
  secondary: 'roles'
}
export default AdminUsersRolesEdit