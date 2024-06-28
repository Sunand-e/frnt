import usePageTitle from '../../../../hooks/usePageTitle';
import GroupsTable from '../../../../components/groups/GroupsTable'
import { Notices } from '../../../../components/common/Notices';
import { useRouter } from 'next/router';
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import ButtonAdd from '../../../../components/common/ButtonAdd';
import useCreateGroup from '../../../../hooks/groups/useCreateGroup';

const AdminUsersGroups = () => {
  
  usePageTitle({ title: 'Groups' })

  const router = useRouter()

  const { createGroup } = useCreateGroup();

  const handleCreateGroup = () => {
    createGroup({
      name: 'Untitled group',
    }, {
      skipOptimisticUpdate: true,
      onCompleted: (data) => {
        // navigate to the new URL with the actual ID
        router.push({
          pathname: '/admin/users/groups/edit',
          query: { id: data.createGroup.group.id },
        });
      }
    })
  }
  
  useHeaderButtons({
    id: 'createGroup',
    component: <ButtonAdd action={handleCreateGroup} text='Create new group' />
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
