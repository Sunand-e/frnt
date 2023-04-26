import usePageTitle from '../../../../hooks/usePageTitle';
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import CreateGroupForm from '../../../../components/groups/CreateGroupForm';
import ButtonBack from '../../../../components/common/ButtonBack';

const AdminUsersGroupsAdd = () => {

  usePageTitle({ title: 'Add new group' })
  
  useHeaderButtons({
    id: "backToGroups",
    component: <ButtonBack text="Back to group list" action="/admin/users/groups" />
  });
  
  return <CreateGroupForm />
}

AdminUsersGroupsAdd.navState = {
  topLevel: 'users',
  secondary: 'groups'
}

export default AdminUsersGroupsAdd