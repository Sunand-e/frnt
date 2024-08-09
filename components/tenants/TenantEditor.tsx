import useGetTenant from "../../hooks/tenants/useGetTenant"
import useUpdateTenant from "../../hooks/tenants/useUpdateTenant"
import { handleModal } from "../../stores/modalStore"
import { useRouter } from "../../utils/router"
import Button from "../common/Button"
import SharedContent from "./SharedContent"
import TenantFontsForm from "./TenantFontsForm"
import TenantForm from "./TenantForm"
import TenantSharedContentForm from "./TenantSharedContentForm"

const TenantEditor = () => {
  
  const router = useRouter()
  const { id } = router.query
  
  const { tenant, loading, error } = useGetTenant(id)
  const { updateTenant } = useUpdateTenant(id)

  const handleSubmit = (formValues) => {
    const values = {
      ...formValues
    }

    updateTenant(values)
    router.push('/admin/tenants')
  }

  const openFontModal = () => {
    handleModal({
      title: 'Upload a custom font',
      content: (
        <TenantFontsForm
          tenant={tenant}
        />
      )
    })
  }

  return (
    <div className='flex space-x-0 flex-col w-full max-w-screen-lg md:flex-row md:space-x-11'>
      <div className="w-full max-w-sm">
        <TenantForm tenant={tenant} onSubmit={handleSubmit} />
        <Button onClick={openFontModal}>Upload fonts</Button>
      </div>
      <div className='flex flex-col w-full space-y-8 mt-4 md:mt-0'>
        {/* <TenantSharedContentForm /> */}
        <SharedContent tenant={tenant} />
      </div>
    </div>
  )
}

export default TenantEditor
