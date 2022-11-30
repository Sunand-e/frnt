import usePageTitle from '../../../hooks/usePageTitle';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetTag from '../../../hooks/tags/useGetTag';
import TagForm from '../../../components/tags/TagForm';
import useUpdateTag from '../../../hooks/tags/useUpdateTag';
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";


const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to categories list</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const AdminUsersTagsEdit = () => {
  
  const router = useRouter()
  const { tag, loading, error } = useGetTag(router.query.id)
  const { updateTag } = useUpdateTag(router.query.id)

  const handleSubmit = (values) => {
    updateTag(values)
    router.push('/admin/tags')
  }
  usePageTitle({ title: `Edit Category${tag?.label && `: ${tag.label}`}` })

  useHeaderButtons([
    [<BackButton />, '/admin/tags']
  ])

  return (
    <>
      { tag &&
        <>
          <TagForm onSubmit={handleSubmit} tag={tag} />
        </>
      }
    </>
  )
}

AdminUsersTagsEdit.navState = {
  topLevel: 'categories'
}
export default AdminUsersTagsEdit
