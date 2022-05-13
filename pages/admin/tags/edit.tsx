import usePageTitle from '../../../hooks/usePageTitle';
import { useRouter } from '../../../utils/router';
import useHeaderButtons from '../../../hooks/useHeaderButtons';
import useGetTag from '../../../hooks/tags/useGetTag';
import TagForm from '../../../components/admin/tags/TagForm';
import useUpdateTag from '../../../hooks/tags/useUpdateTag';


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
    ['Back to tags list', '/admin/tags']
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
  topLevel: 'courses',
  secondary: 'categories'
}
export default AdminUsersTagsEdit