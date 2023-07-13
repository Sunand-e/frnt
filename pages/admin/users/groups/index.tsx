import usePageTitle from '../../../../hooks/usePageTitle';
import GroupsTable from '../../../../components/groups/GroupsTable'
import { Notices } from '../../../../components/common/Notices';
import { useRouter } from 'next/router';
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import ButtonAdd from '../../../../components/common/ButtonAdd';

const AdminUsersGroups = () => {
  
  usePageTitle({ title: 'Groups' })

  const router = useRouter()

  useHeaderButtons({
    id: 'createGroup',
    component: <ButtonAdd action='/admin/users/groups/add' text='Create new group' />
  })

  return (
    <>
      <Notices />
      <GroupsTable />
    </>
  )
}

AdminUsersGroups.capabilities = ['UpdateGroup']
AdminUsersGroups.navState = {
topLevel: 'users',
secondary: 'groups'
}

export default AdminUsersGroups
