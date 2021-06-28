import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminUsersMemberships = () => {

  return (
    <PageTitle title="Title" />
  )
}

AdminUsersMemberships.navState = {
topLevel: 'users',
secondary: 'memberships'
}

export default AdminUsersMemberships