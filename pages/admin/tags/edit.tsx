import useHeaderButtons from '../../../hooks/useHeaderButtons';
import EditTagForm from '../../../components/tags/EditTagForm';
import ButtonBack from '../../../components/common/ButtonBack';

const AdminUsersTagsEdit = () => {
  
  useHeaderButtons({
    id: 'backToTags',
    component: <ButtonBack text='Back to categories list' action='/admin/tags' />,
  })

  return (
    <EditTagForm />
  )
}

AdminUsersTagsEdit.navState = {
  topLevel: 'categories'
}
export default AdminUsersTagsEdit
