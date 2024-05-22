import axios from 'axios';
import { useRouter } from 'next/router';
import ButtonBack from '../../../components/common/ButtonBack';
import UserForm from '../../../components/users/UserForm';
import cache from '../../../graphql/cache';
import { GET_USERS } from '../../../graphql/queries/users';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import usePageTitle from '../../../hooks/usePageTitle';
import useGetUsers from '../../../hooks/users/useGetUsers';
import useUploadAndNotify from '../../../hooks/useUploadAndNotify';
import getJWT from '../../../utils/getToken';

const AdminCreateUser = () => {
  
  usePageTitle({ title: 'Add new user' })
  
  useHeaderButtons({
    id: "backToUsers",
    component: <ButtonBack text="Back to user list" action="/admin/users" />
  });
  
  const router = useRouter()
  const endpoint = "/api/v1/users/"
  const { refetchUsers } = useGetUsers()

  const { uploadFilesAndNotify } = useUploadAndNotify({
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


  const handleSubmit = ({profile_image, firstName, lastName, group_id, ...values}) => {
    const token = getJWT();
    
    const data = {
      group_id,
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
      refetchUsers()
      
      if(response.data.user?.id) {
        if(profile_image) {
          const imageEndpoint = `/api/v1/users/${response.data.user?.id}/update_profile_image`
          profile_image instanceof File && uploadFilesAndNotify(imageEndpoint, {profile_image})
        }
      }
      router.push('/admin/users')
    })
  }

  return (
    <UserForm onSubmit={handleSubmit}  />
  )
}

AdminCreateUser.navState = {
  topLevel: 'users',
  secondary: 'overview'
}

export default AdminCreateUser
