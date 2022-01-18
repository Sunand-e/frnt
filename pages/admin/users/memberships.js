import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';

const AdminUsersMemberships = () => {

  usePageTitle({ title: 'Title' })
  return (
    <></>
  )
}

AdminUsersMemberships.navState = {
topLevel: 'users',
secondary: 'memberships'
}

export default AdminUsersMemberships