import usePageTitle from '../../../hooks/usePageTitle';
import UsersTable from '../../../components/users/UsersTable'
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import {Import} from '@styled-icons/boxicons-regular/Import';
import { useRouter } from 'next/router';
import Button from '../../../components/common/Button';
import ButtonAdd from '../../../components/common/ButtonAdd';

const ImportUserButton = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.push('/admin/users/import')}>
      <p className='hidden lg:block'>Import users</p>
      <span className='block lg:hidden'><Import width="20" /></span>
    </Button>
  )
}

const AdminUsers = () => {

  usePageTitle({ title: 'Users' })
  
  useHeaderButtons([
    {
      id: 'createUser',
      component: <ButtonAdd action='/admin/users/create' text='Create new user' />
    },
    {
      id: 'importUsers',
      component: <ImportUserButton />
    }
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
