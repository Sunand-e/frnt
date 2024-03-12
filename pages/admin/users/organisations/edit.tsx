import EditGroupForm from '../../../../components/groups/EditGroupForm'
import usePageTitle from '../../../../hooks/usePageTitle';
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import useGetGroup from '../../../../hooks/groups/useGetGroup';
import { useRouter } from '../../../../utils/router';
import ButtonBack from '../../../../components/common/ButtonBack';
import OrganisationForm from '../../../../components/groups/organisations/OrganisationForm';
import useUpdateGroup from '../../../../hooks/groups/useUpdateGroup';

const AdminOrganisationsEdit = () => {

  useHeaderButtons({
    id: "backToOrganisations",
    component: <ButtonBack text="Back to organisation list" action="/admin/users/organisations" />
  });
  
  
  const router = useRouter()
  const { id } = router.query
  const { group } = useGetGroup(id)
  const { updateGroup } = useUpdateGroup(group?.id);
  
  usePageTitle({ title: `Edit organisation: ${group?.name}` })

  return <OrganisationForm organisation={group} onSubmit={updateGroup} />
}

AdminOrganisationsEdit.capabilities = ['UpdateGroup']
AdminOrganisationsEdit.navState = {
  topLevel: 'users',
  secondary: 'organisations'
}

export default AdminOrganisationsEdit
