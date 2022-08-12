import usePageTitle from '../../../hooks/usePageTitle';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import TenantsTable from "../../../components/admin/tenants/TenantsTable";

const AdminTenants = () => {

  usePageTitle({ title: 'Tenants' })
  
  useHeaderButtons([
    ['Add tenant', '/admin/tenants/create'],
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
