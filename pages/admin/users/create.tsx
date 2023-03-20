import usePageTitle from '../../../hooks/usePageTitle';
import UserForm from '../../../components/users/UserForm'
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import { useRouter } from 'next/router';
import useGetUsers from '../../../hooks/users/useGetUsers';
import axios from 'axios';
import useUpdateUserTenantRoles from '../../../hooks/users/useUpdateUserTenantRoles';
import {ArrowBack} from '@styled-icons/boxicons-regular/ArrowBack';
import useUploadAndNotify from '../../../hooks/useUploadAndNotify';
import { GET_USERS } from '../../../graphql/queries/users';
import cache from '../../../graphql/cache';
import getJWT from '../../../utils/getToken';


const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to user list</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const AdminCreateUser = () => {
  
  usePageTitle({ title: 'Add new user' })
  
  useHeaderButtons([
    [<BackButton />, '/admin/users'],
  ])
  
  const router = useRouter()
  const endpoint = "/api/v1/users/"
  const { refetchUsers } = useGetUsers()

  const { uploadFileAndNotify } = useUploadAndNotify({
    method: "PUT",
    refetchQuery: GET_USERS,
    onComplete: (response) => {
      cache.modify({
        id: cache.identify(response.data.user),
        fields: {
          profileImageUrl(cachedData) {
            return response.data.user.profile_image_url;
          },
        },
      });
    }
  })


  const handleSubmit = ({profile_image, firstName, lastName, ...values}) => {
    console.log(values)
    const token = getJWT();
    
    const data = {
      user: {
        ...values,
        first_name: firstName, 
        last_name: lastName, 
      // invite: true
    }}

    axios.request({
      method: "post", 
      url: endpoint,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data
    }).then (response => {      
      // Roles are already applied in the REST API call, no need to trigger mutation 
      // updateUserTenantRoles({
      //   userId: data.data.id,
      //   roleIds: values.roles
      // })
      refetchUsers()
      
      if(response.data.user?.id) {
        if(profile_image) {
          const imageEndpoint = `/api/v1/users/${response.data.user?.id}/update_profile_image`
          profile_image instanceof File && uploadFileAndNotify(profile_image, 'profile_image', imageEndpoint)
        }
      }
      router.push('/admin/users')
    })
  }

  return (
    <>
      <UserForm onSubmit={handleSubmit}  />
    </>
  )
}

AdminCreateUser.navState = {
  topLevel: 'users',
  secondary: 'overview'
}

export default AdminCreateUser
