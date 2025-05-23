import usePageTitle from '../../../../hooks/usePageTitle';
import OrganisationsTable from '../../../../components/groups/organisations/OrganisationsTable'
import { Notices } from '../../../../components/common/Notices';
import { useRouter } from 'next/router';
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import ButtonAdd from '../../../../components/common/ButtonAdd';
import useCreateGroup from '../../../../hooks/groups/useCreateGroup';

const AdminOrganisations = () => {
  
  usePageTitle({ title: 'Organisations' })
  
  const router = useRouter(); // get the router object
  const { createGroup } = useCreateGroup();

  const createOrganisation = () => {
    createGroup({
      name: 'Untitled organisation',
      isOrganisation: true
    }, {
      skipOptimisticUpdate: true,
      onCompleted: (data) => {
        // navigate to the new URL with the actual ID
        router.push({
          pathname: '/admin/users/organisations/edit',
          query: { id: data.createGroup.group.id },
        });
      }
    })
  }
  
  useHeaderButtons({
    id: 'createOrganisation',
    component: <ButtonAdd action={createOrganisation} text='Create new organisation' />
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
