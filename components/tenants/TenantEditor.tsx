import useGetTenant from "../../hooks/tenants/useGetTenant"
import useUpdateTenant from "../../hooks/tenants/useUpdateTenant"
import { useRouter } from "../../utils/router"
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
    <div className='flex space-x-0 flex-col w-full max-w-screen-lg md:flex-row md:space-x-11'>
      <TenantForm tenant={tenant} onSubmit={handleSubmit} />
      <div className='flex flex-col w-full space-y-8 mt-4 md:mt-0'>
        <TenantSharedContentForm />
      </div>
    </div>
  )
}

export default TenantEditor
