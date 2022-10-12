import usePageTitle from '../../../hooks/usePageTitle';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetUser from '../../../hooks/users/useGetUser';
import useUpdateUser from '../../../hooks/users/useUpdateUser';
import UserForm from '../../../components/users/UserForm';
import useUpdateUserTenantRoles from '../../../hooks/users/useUpdateUserTenantRoles';
import UserGroups from '../../../components/users/groups/UserGroups';
import UserCourses from '../../../components/users/courses/UserCourses';
import UserResources from '../../../components/users/resources/UserResources';
import {ArrowBack} from '@styled-icons/boxicons-regular/ArrowBack';
import useUploadAndNotify from '../../../hooks/useUploadAndNotify';
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { Dot } from '../../../components/common/misc/Dot';

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
  const { uploadFileAndNotify } = useUploadAndNotify({
    method: "PUT"
  })

  const handleSubmit = ({profile_image, ...values}) => {

    updateUser(values, () => updateUserTenantRoles({
      userId: id,
      roleIds: values.role_ids
    }))

    if(profile_image) {
      const imageEndpoint = `/api/v1/users/${id}/update_profile_image`
      profile_image instanceof File && uploadFileAndNotify(profile_image, 'profile_image', imageEndpoint)
    }
    router.push('/admin/users')
  }
  usePageTitle({ title: `Edit User${user ? `: ${user.fullName}` : ''}` })

  useHeaderButtons([
    [<BackButton />, '/admin/users']
  ])

  return (
    <>
      { user ? (
        <div className='flex space-x-0 flex-col w-full max-w-screen-lg md:flex-row md:space-x-11'>
          {/* <pre>
          { JSON.stringify(id,null,2) }
          { JSON.stringify(user,null,2) }
          </pre> */}
          <UserForm onSubmit={handleSubmit} user={user} />
          <div className='flex flex-col w-full space-y-8 mt-4 md:mt-0'>
            <UserGroups />
            <UserCourses />
            {/* <UserResources /> */}
          </div>
        </div>
      ) : (
        <LoadingSpinner text={(
          <>
            Loading user details
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </>
        )} />
      )}
    </>
  )
}

AdminUsersEdit.navState = {
  topLevel: 'users',
  secondary: 'users'
}
export default AdminUsersEdit
