import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';
import UserCreateForm from '../../../components/admin/users/UserCreateForm'
import UsersTable from '../../../components/admin/users/UsersTable'
import { headerButtonsVar } from '../../../graphql/cache';
import Button from '../../../components/Button';
import { useRouter } from 'next/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';

const AdminUsers = () => {

  usePageTitle({ title: 'Users' })
  
  useHeaderButtons([
    ['Add user', '/admin/users/new'],
    ['Import users', '/admin/users/import']
  ])

  return (
    <>
      <UsersTable />
    </>
  )
}
AdminUsers.navState = {
topLevel: 'users',
secondary: 'overview'
}

export default AdminUsers