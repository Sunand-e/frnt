import usePageTitle from '../../../hooks/usePageTitle';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetTenant from '../../../hooks/tenants/useGetTenant';
import useUpdateTenant from '../../../hooks/tenants/useUpdateTenant';
import TenantForm from '../../../components/admin/tenants/TenantForm';
// import useUpdateTenantTenantRoles from '../../../hooks/tenants/useUpdateTenantTenantRoles';
// import UserGroups from '../../../components/admin/tenants/groups/UserGroups';
// import UserCourses from '../../../components/admin/tenants/courses/UserCourses';
// import UserLibraryItems from '../../../components/admin/tenants/libraryItems/UserLibraryItems';


const AdminTenantsEdit = () => {
  
  const router = useRouter()
  const { id } = router.query
  
  const { tenant, loading, error } = useGetTenant(id)
  const { updateTenant } = useUpdateTenant(id)
  // const { updateTenantTenantRoles } = useUpdateTenantTenantRoles()

  const handleSubmit = (values) => {
    updateTenant(values, () => ({
      tenantId: id
    }))
    router.push('/admin/tenants')
  }
  usePageTitle({ title: `Edit Tenant${tenant ? `: ${tenant.name}` : ''}` })

  useHeaderButtons([
    ['Back to tenants list', '/admin/tenants']
  ])

  return (
    <>
      { tenant &&
        <div className='flex space-x-16'>
          <TenantForm onSubmit={handleSubmit} tenant={tenant} />
          <div className='flex flex-col space-y-8'>
            {/*<UserGroups />*/}
            {/*<UserCourses />*/}
            {/*<UserLibraryItems />*/}
          </div>
        </div>
      }
    </>
  )
}

AdminTenantsEdit.navState = {
  topLevel: 'tenants'
}
export default AdminTenantsEdit
