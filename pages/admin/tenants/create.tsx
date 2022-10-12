import usePageTitle from '../../../hooks/usePageTitle';
import TenantForm from '../../../components/tenants/TenantForm'
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import { useRouter } from 'next/router';
import useGetTenants from '../../../hooks/tenants/useGetTenants';
import axios from 'axios';
import useCreateTenant from "../../../hooks/tenants/useCreateTenant";
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
// import useUpdateUserTenantRoles from '../../../hooks/tenants/useUpdateUserTenantRoles';


const BackButton = () => (
  <>
      <span className='hidden lg:block'>Back to tenant list</span>
      <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const AdminTenantsCreate = () => {

    usePageTitle({ title: 'Create new tenant' })

    useHeaderButtons([
        [<BackButton />, '/admin/tenants'],
    ])

    const router = useRouter()
    const  { createTenant } = useCreateTenant()

    // const { updateUserTenantRoles } = useUpdateUserTenantRoles()

    const handleSubmit = values => {
        createTenant(values, () => {})
        router.push('/admin/tenants')
    }

    return (
        <>
            <TenantForm onSubmit={handleSubmit}  />
        </>
    )
}

AdminTenantsCreate.navState = {
    topLevel: 'tenants',
    secondary: 'overview'
}

export default AdminTenantsCreate
