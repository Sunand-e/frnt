import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../../hooks/usePageTitle';
import CreateGroupForm from '../../../../components/groups/CreateGroupForm'
import GroupsTable from '../../../../components/groups/GroupsTable'
import { Notices } from '../../../../components/common/Notices';
import { headerButtonsVar } from '../../../../graphql/cache';
import Button from '../../../../components/common/Button';
import { useRouter } from 'next/router';
import {Add} from "@styled-icons/fluentui-system-filled/Add";
import useHeaderButtons from "../../../../hooks/useHeaderButtons";

const AddButton = () => (
    <>
        <span className='hidden lg:block'>Create new group</span>
        <span className='block lg:hidden'><Add  width="20" /></span>
    </>
)

const AdminUsersGroups = () => {
  
  usePageTitle({ title: 'Groups' })

  const router = useRouter()


  useHeaderButtons([
    [<AddButton />, '/admin/users/groups/add']
  ])

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
