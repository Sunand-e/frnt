import useGetTenant from "../../../hooks/tenants/useGetTenant"
import useUpdateTenant from "../../../hooks/tenants/useUpdateTenant"
import { useRouter } from "../../../utils/router"
import TenantForm from "./TenantForm"
import TenantSharedContentForm from "./TenantSharedContentForm"

const TenantEditor = () => {
  
  const router = useRouter()
  const { id } = router.query
  
  const { tenant, loading, error } = useGetTenant(id)
  const { updateTenant } = useUpdateTenant(id)
  // const { updateTenantTenantRoles } = useUpdateTenantTenantRoles()

  const handleSubmit = (formValues) => {
    const values = {
      ...formValues,
      settings: {
        ...formValues.settings,
        ...(formValues.primaryBrandColor && {...{primaryBrandColor: formValues.primaryBrandColor}}),
        ...(formValues.secondaryBrandColor && {...{secondaryBrandColor: formValues.secondaryBrandColor}})
      }
    }

    updateTenant(values)
    router.push('/admin/tenants')
  }

  return (
    <div className='flex space-x-16'>
      <TenantForm onSubmit={handleSubmit} />
      <div className='flex flex-col space-y-8'>
        <TenantSharedContentForm />
      </div>
    </div>
  )
}

export default TenantEditor