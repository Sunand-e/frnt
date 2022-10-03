import usePageTitle from '../../../hooks/usePageTitle';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import UserImportForm from '../../../components/admin/users/UserImportForm';
import {ArrowBack} from '@styled-icons/boxicons-regular/ArrowBack';
import BulkImportsTable from '../../../components/admin/bulkImports/BulkImportsTable';


const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to user list</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
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
      <h3 className='mt-8 mb-4'>Previous Imports</h3>
      <BulkImportsTable />
    </>
  )
}

AdminUsersImport.navState = {
  topLevel: 'users',
  secondary: 'overview'
}

export default AdminUsersImport
