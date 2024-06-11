import usePageTitle from '../../../../hooks/usePageTitle';
import OrganisationsTable from '../../../../components/groups/organisations/OrganisationsTable'
import { Notices } from '../../../../components/common/Notices';
import { useRouter } from 'next/router';
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import ButtonAdd from '../../../../components/common/ButtonAdd';

const AdminOrganisations = () => {
  
  usePageTitle({ title: 'Organisations' })
  
  useHeaderButtons({
    id: 'createOrganisation',
    component: <ButtonAdd action='/admin/users/organisations/add' text='Create new organisation' />
  })

  return (
    <>
      <Notices />
      <OrganisationsTable />
    </>
  )
}

AdminOrganisations.capabilities = ['UpdateGroup', 'CreateGroup', 'DeleteGroup']
AdminOrganisations.navState = {
topLevel: 'users',
secondary: 'organisations'
}

export default AdminOrganisations
