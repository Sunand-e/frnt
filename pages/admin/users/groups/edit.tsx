import EditGroupForm from '../../../../components/groups/EditGroupForm'
import usePageTitle from '../../../../hooks/usePageTitle';
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import useGetGroup from '../../../../hooks/groups/useGetGroup';
import { useRouter } from '../../../../utils/router';
import ButtonBack from '../../../../components/common/ButtonBack';

const AdminUsersGroupsEdit = () => {

  useHeaderButtons({
    id: "backToGroups",
    component: <ButtonBack text="Back to group list" action="/admin/users/groups" />
  });

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
