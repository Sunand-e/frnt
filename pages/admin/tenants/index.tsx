import usePageTitle from '../../../hooks/usePageTitle';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import TenantsTable from "../../../components/admin/tenants/TenantsTable";
import {Add} from "@styled-icons/fluentui-system-filled/Add";


const AddButton = () => (
  <>
    <span className='hidden lg:block'>Create new tenant</span>
    <span className='block lg:hidden'><Add  width="20" /></span>
  </>
)

const AdminTenants = () => {

  usePageTitle({ title: 'Tenants' })
  
  useHeaderButtons([
    [<AddButton />, '/admin/tenants/create'],
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
