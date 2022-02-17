import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../../hooks/usePageTitle';
import CreateGroupForm from '../../../../components/admin/groups/CreateGroupForm'
import GroupsTable from '../../../../components/admin/groups/GroupsTable'
import { Notices } from '../../../../components/Notices';
import { headerButtonsVar } from '../../../../graphql/cache';
import Button from '../../../../components/Button';
import { useRouter } from 'next/router';

const AdminUsersGroups = () => {
  
  usePageTitle({ title: 'Groups' })

  const router = useRouter()
  
  const handleAddClick = (e) => {
    router.push('/admin/users/groups/add')
    e.target.blur()
  }


  headerButtonsVar(
    <>
      <Button onClick={handleAddClick}>Add new group</Button>
    </>
  )

  return (
    <>
      <Notices />
      <GroupsTable />
    </>
  )
}

AdminUsersGroups.navState = {
topLevel: 'users',
secondary: 'groups'
}

export default AdminUsersGroups