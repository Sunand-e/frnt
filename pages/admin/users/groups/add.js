import CreateGroupForm from '../../../../components/admin/groups/CreateGroupForm';
import usePageTitle from '../../../../hooks/usePageTitle';
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
import useHeaderButtons from "../../../../hooks/useHeaderButtons";

const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to groups list</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const AdminUsersGroupsAdd = () => {

  usePageTitle({ title: 'Add new group' })

  useHeaderButtons([
    [<BackButton />, '/admin/users/groups']
  ])
  
  return (
    <>
      <CreateGroupForm />
    </>
  )
}

AdminUsersGroupsAdd.navState = {
topLevel: 'users',
secondary: 'groups'
}

export default AdminUsersGroupsAdd
