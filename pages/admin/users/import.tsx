import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle';
import UserCreateForm from '../../../components/admin/users/UserCreateForm'
import UsersTable from '../../../components/admin/users/UsersTable'
import { headerButtonsVar } from '../../../graphql/cache';
import Button from '../../../components/Button';
import { useRouter } from 'next/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import UserImportForm from '../../../components/admin/users/UserImportForm';

const AdminUsersImport = () => {

  usePageTitle({ title: 'Import users' })
  
  useHeaderButtons([
    ['Back to user list', '/admin/users'],
  ])

  return (
    <>
      <UserImportForm />
    </>
  )
}

AdminUsersImport.navState = {
  topLevel: 'users',
  secondary: 'overview'
}

export default AdminUsersImport