import usePageTitle from '../hooks/usePageTitle';
import { useRouter } from '../utils/router';
import useHeaderButtons from '../hooks/useHeaderButtons';
import useGetUser from '../hooks/users/useGetUser';
import useUpdateUser from '../hooks/users/useUpdateUser';
import UserForm from '../components/admin/users/UserForm';
import useUpdateUserTenantRoles from '../hooks/users/useUpdateUserTenantRoles';
import UserGroups from '../components/admin/users/groups/UserGroups';
import UserCourses from '../components/admin/users/courses/UserCourses';
import UserResources from '../components/admin/users/resources/UserResources';
import {ArrowBack} from '@styled-icons/boxicons-regular/ArrowBack';
import useUploadAndNotify from '../hooks/useUploadAndNotify';
import ProfileForm from '../components/forms/ProfileForm';

const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to dashboard</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const ProfilePage = () => {
  
  const router = useRouter()
  const { user, loading, error } = useGetUser()

  const { updateUser } = useUpdateUser()
  const { updateUserTenantRoles } = useUpdateUserTenantRoles()
  const { uploadFileAndNotify } = useUploadAndNotify({
    method: "PUT"
  })

  const handleSubmit = ({profile_image, ...values}) => {

    updateUser(values, () => updateUserTenantRoles({
      roleIds: values.role_ids
    }))

    if(profile_image) {
      const imageEndpoint = `/api/v1/users/${user.id}/update_profile_image`
      profile_image instanceof File && uploadFileAndNotify(profile_image, 'profile_image', imageEndpoint)
    }
    router.push('/')
  }
  usePageTitle({ title: `Edit Profile` })

  useHeaderButtons([
    [<BackButton />, '/']
  ])

  return (
    <>
      { user &&
        <div className='flex space-x-0 flex-col w-full max-w-lg md:flex-row md:space-x-11'>
          {/* <pre>
          { JSON.stringify(id,null,2) }
          { JSON.stringify(user,null,2) }
          </pre> */}
          <ProfileForm onSubmit={handleSubmit} user={user} />
          <div className='flex flex-col w-full space-y-8 mt-4 md:mt-0'>
            {/* <UserGroups />
            <UserCourses /> */}
            {/* <UserResources /> */}
          </div>
        </div>
      }
    </>
  )
}
ProfilePage.navState = {
  topLevel: 'dashboard'
}
export default ProfilePage
