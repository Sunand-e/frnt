import CreateGroupForm from '../../../../components/admin/groups/CreateGroupForm';
import usePageTitle from '../../../../hooks/usePageTitle';

import { headerButtonsVar } from '../../../../graphql/cache';

const AdminUsersGroupsAdd = () => {

  usePageTitle({ title: 'Add new group' })
  
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