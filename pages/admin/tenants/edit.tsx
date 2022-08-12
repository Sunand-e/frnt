import usePageTitle from '../../../hooks/usePageTitle';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetTenant from '../../../hooks/tenants/useGetTenant';
import useUpdateTenant from '../../../hooks/tenants/useUpdateTenant';
import TenantForm from '../../../components/admin/tenants/TenantForm';
import TenantEditor from '../../../components/admin/tenants/TenantEditor';


const AdminTenantsEdit = () => {
  
  const router = useRouter()
  const { id } = router.query
  
  const { tenant, loading, error } = useGetTenant(id)

  usePageTitle({ title: `Edit Tenant${tenant ? `: ${tenant.name}` : ''}` })

  useHeaderButtons([
    ['Back to tenants list', '/admin/tenants']
  ])

  return (
    <>
      { tenant && <TenantEditor /> }
    </>
  )
}

AdminTenantsEdit.navState = {
  topLevel: 'tenants'
}
export default AdminTenantsEdit
