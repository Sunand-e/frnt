import usePageTitle from '../../../hooks/usePageTitle'
import { useRouter } from '../../../utils/router'
import useUpdateResource from '../../../hooks/resources/useUpdateResource'
import useHeaderButtons from '../../../hooks/useHeaderButtons'
import ResourceForm from '../../../components/resources/ResourceForm'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import { JsonInput } from '@mantine/core'
import ButtonBack from '../../../components/common/ButtonBack'

const AdminResourcesEdit = () => {

  const router = useRouter()
    
  const { id } = router.query
  
  const { resource, updateResource } = useUpdateResource(id)

  useHeaderButtons({
    id: 'backToResources',
    component: <ButtonBack text='Back to Resource Library' action='/admin/resources' />,
  })

  usePageTitle({ 
    title: "Edit Resource: ", 
    editable:  resource?.title,
    onEdit: title => updateResource({title})
  })

  const handleSubmit = (values) => {
    updateResource(values)
  }

  return (
    <>
      { resource && <ResourceForm resource={resource} onSubmit={handleSubmit} /> }
    </>
  )
}

AdminResourcesEdit.navState = {
  topLevel: 'resources'
}

export default AdminResourcesEdit
