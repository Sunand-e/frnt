import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';
import UserCreateForm from '../../../components/admin/users/UserCreateForm'
import UsersTable from '../../../components/admin/users/UsersTable'

const AdminUsers = () => {

  usePageTitle({ title: 'Users' })

  return (
    <>
      <UserCreateForm />
      <UsersTable />
    </>
  )
}
AdminUsers.navState = {
topLevel: 'users',
secondary: 'overview'
}

export default AdminUsers