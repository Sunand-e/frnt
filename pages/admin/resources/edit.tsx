import usePageTitle from '../../../hooks/usePageTitle'
import { useRouter } from '../../../utils/router'
import useResource from '../../../hooks/resources/useResource'
import useHeaderButtons from '../../../hooks/useHeaderButtons'
import ResourceForm from '../../../components/resources/ResourceForm'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'

const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to resource library</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const AdminResourcesEdit = () => {

  const router = useRouter()
    
  const { id } = router.query
  
  const { resource, updateResource } = useResource(id)

  useHeaderButtons([
    [<BackButton />, '/admin/resources']
  ])

  usePageTitle({ 
    title: "Edit Resource: ", 
    editable:  resource?.title,
    onEdit: title => updateResource({title})
  })

  return (
    <>
      <ResourceForm resource={resource} onSubmit={handleSubmit} />
    </>
  )
}

AdminResourcesEdit.navState = {
  topLevel: 'resources'
}

export default AdminResourcesEdit
