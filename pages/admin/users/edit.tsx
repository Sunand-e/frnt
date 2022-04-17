import usePageTitle from '../../../hooks/usePageTitle';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetUser from '../../../hooks/users/useGetUser';
import useUpdateUser from '../../../hooks/users/useUpdateUser';
import UserForm from '../../../components/admin/users/UserForm';
import useUpdateUserTenantRoles from '../../../hooks/users/useUpdateUserTenantRoles';
import UserGroups from '../../../components/admin/users/groups/UserGroups';
import UserCourses from '../../../components/admin/users/courses/UserCourses';
import UserLibraryItems from '../../../components/admin/users/libraryItems/UserLibraryItems';


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
        <div className='flex space-x-16'>
          <UserForm onSubmit={handleSubmit} user={user} />
          <div className='flex flex-col space-y-8'>
            <UserGroups />
            <UserCourses />
            <UserLibraryItems />
          </div>
        </div>
      }
    </>
  )
}

AdminUsersEdit.navState = {
  topLevel: 'users',
  secondary: 'users'
}
export default AdminUsersEdit