import usePageTitle from '../../../hooks/usePageTitle';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetUser from '../../../hooks/users/useGetUser';
import useUpdateUser from '../../../hooks/users/useUpdateUser';
import UserForm from '../../../components/admin/users/UserForm';
import useUpdateUserTenantRoles from '../../../hooks/users/useUpdateUserTenantRoles';
import UserGroups from '../../../components/admin/users/groups/UserGroups';
import UserCourses from '../../../components/admin/users/courses/UserCourses';
import UserLibraryItems from '../../../components/admin/users/resources/UserLibraryItems';
import {ArrowBack} from '@styled-icons/boxicons-regular/ArrowBack';

const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to user list</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

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
    [<BackButton />, '/admin/users']
  ])

  return (
    <>
      { user &&
        <div className='flex space-x-0 flex-col md:flex-row md:space-x-16'>
          <UserForm onSubmit={handleSubmit} user={user} />
          <div className='flex flex-col space-y-8 mt-4 md:mt-0'>
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
