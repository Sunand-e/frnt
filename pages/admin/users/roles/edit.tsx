import usePageTitle from '../../../../hooks/usePageTitle';
import { useRouter } from '../../../../utils/router';
import useHeaderButtons from '../../../../hooks/useHeaderButtons';
import useGetRole from '../../../../hooks/roles/useGetRole';
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

  usePageTitle({ title: `Edit Role${role?.name && `: ${role.name}`}` })

  useHeaderButtons([
    ['Back to roles list', '/admin/users/roles']
  ])

  return (
    <>
      { role &&
        <>
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