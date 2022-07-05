import usePageTitle from '../../../hooks/usePageTitle';
import UsersTable from '../../../components/admin/users/UsersTable'
import useHeaderButtons from '../../../hooks/useHeaderButtons';

const AdminTenants = () => {

  usePageTitle({ title: 'Tenants' })
  
  useHeaderButtons([
    ['Add tenant', '/admin/tenants/new'],
  ])

  return (
    <>
      <UsersTable />
    </>
  )
}
AdminTenants.navState = {
topLevel: 'tenants'
}

export default AdminTenants