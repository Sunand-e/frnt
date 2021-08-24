import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';
import UserCreateForm from '../../../components/admin/users/UserCreateForm'
import UsersTable from '../../../components/admin/users/UsersTable'

const AdminUsers = () => {

  return (
    <>
      <PageTitle title="Users" />
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