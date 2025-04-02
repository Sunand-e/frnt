import usePageTitle from '../../../hooks/usePageTitle';
import UsersTable from '../../../components/users/UsersTable'
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import {Import} from '@styled-icons/boxicons-regular/Import';
import { useRouter } from 'next/router';
import Button from '../../../components/common/Button';
import ButtonAdd from '../../../components/common/ButtonAdd';
import useGetCurrentTenant from '../../../hooks/tenants/useGetCurrentTenant';
import { useMemo } from 'react';

const ImportUserButton = ({disabled=false}) => {
  const router = useRouter()
  return (
    <>
      <Button onClick={() => router.push('/admin/users/import')} disabled={disabled} >
        <p className='hidden lg:block'>Import users</p>
        <span className='block lg:hidden'><Import width="20" /></span>
      </Button>
    </>
  )
}

const AdminUsers = () => {

  usePageTitle({ title: 'Users' })
  const { tenant } = useGetCurrentTenant()

  const isUserLimitFull = useMemo(() => {
    console.log(tenant?.settings?.users?.limit);
    if(tenant?.settings?.users?.limit){
      return Number(tenant.settings.users.limit_count) <= tenant.users.totalCount
    } else {
      return false
    }
  }, [tenant])

  useHeaderButtons([
    {
      id: 'createUser',
      component: <ButtonAdd action='/admin/users/create' text='Create new user' disabled={isUserLimitFull} />
    },
    {
      id: 'importUsers',
      component: <ImportUserButton disabled={isUserLimitFull}/>
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
