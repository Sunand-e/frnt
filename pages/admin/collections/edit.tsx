import useHeaderButtons from '../../../hooks/useHeaderButtons';
import EditTagForm from '../../../components/tags/EditTagForm';
import ButtonBack from '../../../components/common/ButtonBack';

const AdminUsersTagsEdit = () => {
  
  useHeaderButtons({
    id: 'backToCollections',
    component: <ButtonBack text='Back to collections list' action='/admin/collections' />,
  })

  return (
    <EditTagForm typeName={ 'collection' } />
  )
}

AdminUsersTagsEdit.navState = {
  topLevel: 'collections'
}
export default AdminUsersTagsEdit
