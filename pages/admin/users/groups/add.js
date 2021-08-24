import GroupCreateForm from '../../../../components/admin/users/GroupCreateForm';
import PageTitle from '../../../../components/PageTitle';
import { headerButtonsVar } from '../../../../graphql/cache';

const AdminUsersGroupsAdd = () => {
  
  return (
    <>
      <PageTitle title="Add new group" />
      <GroupCreateForm />
    </>
  )
}

AdminUsersGroupsAdd.navState = {
topLevel: 'users',
secondary: 'groups'
}

export default AdminUsersGroupsAdd