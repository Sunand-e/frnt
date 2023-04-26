import usePageTitle from '../../../hooks/usePageTitle';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import TenantsTable from "../../../components/tenants/TenantsTable";
import ButtonAdd from '../../../components/common/ButtonAdd';

const AdminTenants = () => {

  usePageTitle({ title: 'Tenants' })
  
  useHeaderButtons({
    id: 'createTenant',
    component: <ButtonAdd action='/admin/tenants/create' text='Create new tenant' />
  })

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
