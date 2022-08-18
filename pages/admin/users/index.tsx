import usePageTitle from '../../../hooks/usePageTitle';
import UsersTable from '../../../components/admin/users/UsersTable'
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import {Add} from '@styled-icons/fluentui-system-filled/Add';
import {AddCircle} from '@styled-icons/fluentui-system-regular/AddCircle';
import {Import} from '@styled-icons/boxicons-regular/Import';

const AddButton = () => (
  <>
    <span className='hidden lg:block'>Create new user</span>
    <span className='block lg:hidden'><Add  width="20" /></span>
  </>
)

const ImportUserButton = () => (
  <>
    <p className='hidden lg:block'>Import users</p>
    <span className='block lg:hidden'><Import  width="20" /></span>
  </>
)

const AdminUsers = () => {

  usePageTitle({ title: 'Users' })
  
  useHeaderButtons([
    [<AddButton />, '/admin/users/new'],
    [<ImportUserButton />, '/admin/users/import']
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
