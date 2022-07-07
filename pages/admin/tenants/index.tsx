import usePageTitle from '../../../hooks/usePageTitle';
import UsersTable from '../../../components/admin/users/UsersTable'
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import TenantsTable from "../../../components/admin/tenants/TenantsTable";

const AdminTenants = () => {

  usePageTitle({ title: 'Tenants' })
  
  useHeaderButtons([
    ['Add tenant', '/admin/tenants/new'],
  ])

  return (
    <>
      <TenantsTable />
    </>
  )
}
AdminTenants.navState = {
topLevel: 'tenants'
}

export default AdminTenants
