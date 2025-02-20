import usePageTitle from '../../../hooks/usePageTitle';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import UserImportForm from '../../../components/users/UserImportForm';
import ButtonBack from '../../../components/common/ButtonBack';

const AdminUsersImport = () => {

  usePageTitle({ title: 'Import users' })
  
  useHeaderButtons({
    id: "backToUsers",
    component: <ButtonBack text="Back to user list" action="/admin/users" />
  });

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
