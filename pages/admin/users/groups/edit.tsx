import EditGroupForm from '../../../../components/groups/EditGroupForm'
import usePageTitle from '../../../../hooks/usePageTitle';
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import useGetGroup from '../../../../hooks/groups/useGetGroup';
import { useRouter } from '../../../../utils/router';

const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to groups list</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const AdminUsersGroupsEdit = () => {

  useHeaderButtons([
    [<BackButton />, '/admin/users/groups']
  ])
  const router = useRouter()
  const { id } = router.query
  const { group } = useGetGroup(id)
  usePageTitle({ title: `Edit group: ${group?.name}` })

  return <EditGroupForm />
}

AdminUsersGroupsEdit.capabilities = ['UpdateGroup']
AdminUsersGroupsEdit.navState = {
  topLevel: 'users',
  secondary: 'groups'
}

export default AdminUsersGroupsEdit
