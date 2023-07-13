import usePageTitle from '../../../../hooks/usePageTitle';
import { useRouter } from '../../../../utils/router';
import useHeaderButtons from '../../../../hooks/useHeaderButtons';
import useGetRole from '../../../../hooks/roles/useGetRole';
import RoleForm from '../../../../components/roles/RoleForm';
import useUpdateRole from '../../../../hooks/roles/useUpdateRole';
import ButtonBack from '../../../../components/common/ButtonBack';

const AdminUsersRolesEdit = () => {
  
  const router = useRouter()
  const { role, loading, error } = useGetRole(router.query.id)
  const { updateRole } = useUpdateRole(router.query.id)

  const handleSubmit = (values) => {
    updateRole(values)
    router.push('/admin/users/roles')
  }

  usePageTitle({ title: `Edit Role${role?.name && `: ${role.name}`}` })

  useHeaderButtons({
    id: "backToRoles",
    component: <ButtonBack text="Back to roles list" action="/admin/users/roles" />
  });

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
