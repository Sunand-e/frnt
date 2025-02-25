import usePageTitle from '../../../hooks/usePageTitle';
import TenantReportsTable from '../../../components/tenants/TenantReportsTable';

const AdminTenantReports = () => {

  usePageTitle({ title: 'Tenant Reports' })

  return (
    <>
      <TenantReportsTable />
    </>
  )
}

AdminTenantReports.navState = {
  topLevel: 'tenant_reports'
}

export default AdminTenantReports
