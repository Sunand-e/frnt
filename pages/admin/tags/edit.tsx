import usePageTitle from '../../../hooks/usePageTitle';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetTag from '../../../hooks/tags/useGetTag';
import EditTagForm from '../../../components/tags/EditTagForm';
import useUpdateTag from '../../../hooks/tags/useUpdateTag';
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";


const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to categories list</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const AdminUsersTagsEdit = () => {
  
  useHeaderButtons([
    [<BackButton />, '/admin/tags']
  ])

  return (
    <EditTagForm />
  )
}

AdminUsersTagsEdit.navState = {
  topLevel: 'categories'
}
export default AdminUsersTagsEdit
