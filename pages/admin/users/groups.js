import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminUsersGroups = () => {

  return (
    <PageTitle title="Title" />
  )
}

AdminUsersGroups.navState = {
topLevel: 'users',
secondary: 'groups'
}

export default AdminUsersGroups