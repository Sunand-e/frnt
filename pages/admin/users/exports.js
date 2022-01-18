import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';

const AdminUsersExports = () => {

  usePageTitle({ title: 'Title' })
  return (
    <></>
  )
}

AdminUsersExports.navState = {
topLevel: 'users',
secondary: 'exports'
}

export default AdminUsersExports