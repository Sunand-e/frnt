import usePageTitle from '../../../hooks/usePageTitle';
import UserForm from '../../../components/admin/users/UserForm'
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import { useRouter } from 'next/router';
import useGetUsers from '../../../hooks/users/useGetUsers';
import axios from 'axios';
import useUpdateUserTenantRoles from '../../../hooks/users/useUpdateUserTenantRoles';

const AdminUsersNew = () => {
  
  usePageTitle({ title: 'Add new user' })
  
  useHeaderButtons([
    ['Back to user list', '/admin/users'],
  ])
  
  const router = useRouter()
  const endpoint = "/api/v1/users/"
  const { refetchUsers } = useGetUsers()
  
  const { updateUserTenantRoles } = useUpdateUserTenantRoles()
  
  const handleSubmit = values => {
    
    const token = localStorage.getItem('token');
    
    const data = {
      user: {
        ...values,
      // invite: true
    }}

    axios.request({
      method: "post", 
      url: endpoint,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data
    }).then (data => {
      
      // Roles are already applied in the REST API call, no need to trigger mutation 
      // updateUserTenantRoles({
      //   userId: data.data.id,
      //   roleIds: values.roles
      // })

      refetchUsers()
      router.push('/admin/users')
    })
  }

  return (
    <>
      <UserForm onSubmit={handleSubmit}  />
    </>
  )
}

AdminUsersNew.navState = {
  topLevel: 'users',
  secondary: 'overview'
}

export default AdminUsersNew