import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../../components/PageTitle';
import GroupCreateForm from '../../../../components/admin/users/GroupCreateForm'
import GroupsTable from '../../../../components/admin/users/GroupsTable'
import { Notices } from '../../../../components/Notices';
import { headerButtonsVar, viewVar } from '../../../../graphql/cache';
import Button from '../../../../components/Button';
import { useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';

const AdminUsersGroups = () => {

  const view = useReactiveVar(viewVar);
  
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
      <PageTitle title="Groups" />
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