import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';

const AdminUsersRoles = () => {

  usePageTitle({ title: 'Title' })

  return (
    <></>
  )
}

AdminUsersRoles.navState = {
topLevel: 'users',
secondary: 'roles'
}

export default AdminUsersRoles