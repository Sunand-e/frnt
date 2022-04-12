import usePageTitle from '../../../hooks/usePageTitle';
import UsersTable from '../../../components/admin/users/UsersTable'
import useHeaderButtons from '../../../hooks/useHeaderButtons';

const AdminUsers = () => {

  usePageTitle({ title: 'Users' })
  
  useHeaderButtons([
    ['Add user', '/admin/users/new'],
    ['Import users', '/admin/users/import']
  ])

  return (
    <>
      <UsersTable />
    </>
  )
}
AdminUsers.navState = {
topLevel: 'users',
secondary: 'overview'
}

export default AdminUsers