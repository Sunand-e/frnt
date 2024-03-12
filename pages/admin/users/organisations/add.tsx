import usePageTitle from '../../../../hooks/usePageTitle';
import useHeaderButtons from "../../../../hooks/useHeaderButtons";
import CreateGroupForm from '../../../../components/groups/CreateGroupForm';
import ButtonBack from '../../../../components/common/ButtonBack';
import OrganisationForm from '../../../../components/groups/organisations/OrganisationForm';
import useCreateGroup from '../../../../hooks/groups/useCreateGroup';

const AdminOrganisationsAdd = () => {

  usePageTitle({ title: 'Add new organisation' })
  
  useHeaderButtons({
    id: "backToOrganisations",
    component: <ButtonBack text="Back to organisation list" action="/admin/users/organisations" />
  });
  
  const { createGroup } = useCreateGroup();

  const handleSubmit = values => {
    console.log('values')
    console.log(values)
    createGroup({
      ...values,
      isOrganisation: true
    })
  }

  return <OrganisationForm onSubmit={handleSubmit}/>
}

AdminOrganisationsAdd.navState = {
  topLevel: 'users',
  secondary: 'organisations'
}

export default AdminOrganisationsAdd