import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminUsers = () => {

  return (
    <PageTitle title="Title" />
  )
}

AdminUsers.navState = {
topLevel: 'users',
secondary: 'overview'
}

export default AdminUsers