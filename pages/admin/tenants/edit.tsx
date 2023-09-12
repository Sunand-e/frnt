import usePageTitle from '../../../hooks/usePageTitle';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetTenant from '../../../hooks/tenants/useGetTenant';
import TenantEditor from '../../../components/tenants/TenantEditor';
import ButtonBack from '../../../components/common/ButtonBack';

const AdminTenantsEdit = () => {
  
  const router = useRouter()
  const { id } = router.query
  
  const { tenant, loading, error } = useGetTenant(id)

  usePageTitle({ title: `Edit Tenant${tenant ? `: ${tenant.name}` : ''}` })

  useHeaderButtons({
    id: "backToTenants",
    component: <ButtonBack text="Back to tenant list" action="/admin/tenants" />
  });

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
