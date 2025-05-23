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
import { useState } from 'react';

const AdminCreateUser = () => {
  
  usePageTitle({ title: 'Add new user' })
  
  useHeaderButtons({
    id: "backToUsers",
    component: <ButtonBack text="Back to user list" action="/admin/users" />
  });
  
  const router = useRouter()
  const endpoint = "/api/v1/users/"
  const { refetch } = useGetUsers({ pagination: true })
  const [errors, setErrors] = useState();

  const { uploadFilesAndNotify } = useUploadAndNotify({
    method: "PUT",
    refetchQueries: [GET_USERS],
    onComplete: (response: any) => {
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
      data
    }).then (response => {
      refetch()
      
      if(response.data.user?.id) {
        if(profile_image) {
          const imageEndpoint = `/api/v1/users/${response.data.user?.id}/update_profile_image`
          profile_image instanceof File && uploadFilesAndNotify(imageEndpoint, {profile_image})
        }
        if (group_id) {
          cache.modify({
            id: cache.identify({ __typename: 'Group', id: group_id }),
            fields: {
              users(existingConnection = { edges: [], totalCount: 0 }) {
                const newEdge = {
                  __typename: 'GroupUserEdge',
                  userId: response.data.user.id,
                  groupId: group_id,
                  node: response.data.user,
                };

                return {
                  ...existingConnection,
                  ...(existingConnection.edges
                    ? { edges: [...existingConnection.edges, newEdge] }
                    : {}),
                  totalCount: existingConnection.totalCount + 1,
                };
              },
            },
          });
        }
      }
      router.push('/admin/users')
    }).catch(error => {
      setErrors(error.response.data.errors.join(', '))
    })
  }

  return (
    <>
      <UserForm onSubmit={handleSubmit} />
      {errors && <span role="alert" className='text-red-500'>{errors}</span>}
    </>
  )
}

AdminCreateUser.navState = {
  topLevel: 'users',
  secondary: 'overview'
}

export default AdminCreateUser
