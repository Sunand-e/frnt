import GroupCreateForm from '../../../../components/admin/users/GroupCreateForm';
import usePageTitle from '../../../../hooks/usePageTitle';

import { headerButtonsVar } from '../../../../graphql/cache';

const AdminUsersGroupsAdd = () => {

  usePageTitle({ title: 'Add new group' })
  
  return (
    <>
      <GroupCreateForm />
    </>
  )
}

AdminUsersGroupsAdd.navState = {
topLevel: 'users',
secondary: 'groups'
}

export default AdminUsersGroupsAdd