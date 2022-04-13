import usePageTitle from '../../../hooks/usePageTitle';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetUser from '../../../hooks/users/useGetUser';
import useUpdateUser from '../../../hooks/users/useUpdateUser';
import UserForm from '../../../components/admin/users/UserForm';
import useUpdateUserTenantRoles from '../../../hooks/users/useUpdateUserTenantRoles';


const AdminUsersEdit = () => {
  
  const router = useRouter()
  const { id } = router.query
  
  const { user, loading, error } = useGetUser(id)
  const { updateUser } = useUpdateUser(id)
  const { updateUserTenantRoles } = useUpdateUserTenantRoles()

  const handleSubmit = (values) => {
    updateUser(values, () => updateUserTenantRoles({
      userId: id,
      roleIds: values.role_ids
    }))
    router.push('/admin/users')
  }
  usePageTitle({ title: `Edit User${user ? `: ${user.fullName}` : ''}` })

  useHeaderButtons([
    ['Back to users list', '/admin/users']
  ])

  return (
    <>
      { user &&
        <>
          <UserForm onSubmit={handleSubmit} user={user} />
        </>
      }
    </>
  )
}

AdminUsersEdit.navState = {
  topLevel: 'users',
  secondary: 'users'
}
export default AdminUsersEdit