import usePageTitle from '../../../hooks/usePageTitle';
import TenantForm from '../../../components/admin/tenants/TenantForm'
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import { useRouter } from 'next/router';
import useGetTenants from '../../../hooks/tenants/useGetTenants';
import axios from 'axios';
import useCreateTenant from "../../../hooks/tenants/useCreateTenant";
// import useUpdateUserTenantRoles from '../../../hooks/tenants/useUpdateUserTenantRoles';

const AdminTenantsNew = () => {

    usePageTitle({ title: 'Add new tenant' })

    useHeaderButtons([
        ['Back to tenant list', '/admin/tenants'],
    ])

    const router = useRouter()
    const  { createTenant } = useCreateTenant()

    // const { updateUserTenantRoles } = useUpdateUserTenantRoles()

    const handleSubmit = values => {
        router.push('/admin/tenants')
        createTenant(values, () => {})

    }

    return (
        <>
            <TenantForm onSubmit={handleSubmit}  />
        </>
    )
}

AdminTenantsNew.navState = {
    topLevel: 'tenants',
    secondary: 'overview'
}

export default AdminTenantsNew
