import usePageTitle from '../../../hooks/usePageTitle';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetUser from '../../../hooks/users/useGetUser';
import UserForm from '../../../components/admin/users/UserForm';
import useUpdateUser from '../../../hooks/users/useUpdateUser';


const AdminUsersEdit = () => {
  
  const router = useRouter()
  const { user, loading, error } = useGetUser(router.query.id)
  const { updateUser } = useUpdateUser(router.query.id)

  const handleSubmit = (values) => {
    updateUser(values)
    router.push('/admin/users/users')
  }
  usePageTitle({ title: 'Edit User' })

  useHeaderButtons([
    ['Back to users list', '/admin/users/users']
  ])

  console.log('user')
  console.log(user)
  return (
    <>
      { user &&
        <>
          <h3>
            Editing user: {user.name}
          </h3>
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