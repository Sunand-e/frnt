import usePageTitle from '../../../hooks/usePageTitle';
import UserForm from '../../../components/admin/users/UserForm'
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import { useRouter } from 'next/router';
import useGetUsers from '../../../hooks/users/useGetUsers';
import axios from 'axios';

const AdminUsersNew = () => {

  usePageTitle({ title: 'Add new user' })
  
  useHeaderButtons([
    ['Back to user list', '/admin/users'],
  ])
  
  const router = useRouter()
  const endpoint = "/api/v1/users/"
  const { refetchUsers } = useGetUsers()

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