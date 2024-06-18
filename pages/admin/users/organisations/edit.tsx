import EditGroupForm from '../../../../components/groups/EditGroupForm'
import usePageTitle from '../../../../hooks/usePageTitle';
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import useGetGroup from '../../../../hooks/groups/useGetGroup';
import { useRouter } from '../../../../utils/router';
import ButtonBack from '../../../../components/common/ButtonBack';
import OrganisationForm from '../../../../components/groups/organisations/OrganisationForm';
import useUpdateGroup from '../../../../hooks/groups/useUpdateGroup';
import LoadingSpinner from '../../../../components/common/LoadingSpinner';
import { Dot } from '../../../../components/common/misc/Dot';

const AdminOrganisationsEdit = () => {

  useHeaderButtons({
    id: "backToOrganisations",
    component: <ButtonBack text="Back to organisation list" action="/admin/users/organisations" />
  });
  
  
  const router = useRouter()
  const { id } = router.query
  const { group, loading } = useGetGroup(id)
  
  usePageTitle({ title: `Edit organisation: ${group?.name}` })

  return (
    <>
      { loading ? (
        <LoadingSpinner text={(
          <>
            Loading organisation details
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </>
        )} />
      ) : !!group && (
        <OrganisationForm organisation={group} />
      )}
    </>
  )
}

AdminOrganisationsEdit.capabilities = ['UpdateGroup']
AdminOrganisationsEdit.navState = {
  topLevel: 'users',
  secondary: 'organisations'
}

export default AdminOrganisationsEdit
