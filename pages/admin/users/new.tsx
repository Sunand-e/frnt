import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';
import UserCreateForm from '../../../components/admin/users/UserCreateForm'
import UsersTable from '../../../components/admin/users/UsersTable'
import { headerButtonsVar } from '../../../graphql/cache';
import Button from '../../../components/Button';
import { useRouter } from 'next/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';

const AdminUsersNew = () => {

  usePageTitle({ title: 'Add new user' })
  
  useHeaderButtons([
    ['Back to user list', '/admin/users'],
  ])

  return (
    <>
      <UserCreateForm />
    </>
  )
}

AdminUsersNew.navState = {
  topLevel: 'users',
  secondary: 'overview'
}

export default AdminUsersNew