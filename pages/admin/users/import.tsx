import usePageTitle from '../../../hooks/usePageTitle';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import UserImportForm from '../../../components/admin/users/UserImportForm';
import {ArrowBack} from '@styled-icons/boxicons-regular/ArrowBack';
import {Back} from '@styled-icons/entypo/Back'

const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to user list</span>
    <span className='block lg:hidden'><Back  width="20" /></span>
  </>
)

const AdminUsersImport = () => {

  usePageTitle({ title: 'Import users' })
  
  useHeaderButtons([
    [<BackButton />, '/admin/users'],
  ])

  return (
    <>
      <UserImportForm />
    </>
  )
}

AdminUsersImport.navState = {
  topLevel: 'users',
  secondary: 'overview'
}

export default AdminUsersImport
