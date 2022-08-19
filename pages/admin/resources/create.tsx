import usePageTitle from '../../../hooks/usePageTitle'
import useCreateResource from '../../../hooks/resources/useCreateResource'
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
import useHeaderButtons from "../../../hooks/useHeaderButtons";
import ResourceForm from '../../../components/resources/ResourceForm'

const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to Resource Library</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const CreateResourcePage = () => {

  useHeaderButtons([
    [<BackButton />, '/admin/resources']
  ])

  const { createResource } = useCreateResource()

  const handleSubmit = (values) => {
    createResource(values)
  }

  usePageTitle({
    title: `New resource`
  })

  return (
    <>
      <ResourceForm onSubmit={handleSubmit} />
    </>
  )
}

CreateResourcePage.navState = {
  topLevel: 'resources',
}

export default CreateResourcePage