import usePageTitle from '../../../hooks/usePageTitle'
import useCreateResource from '../../../hooks/resources/useCreateResource'
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
import useHeaderButtons from "../../../hooks/useHeaderButtons";
import ResourceForm from '../../../components/resources/ResourceForm'
import ButtonBack from '../../../components/common/ButtonBack';

const CreateResourcePage = () => {
    
  useHeaderButtons({
    id: 'backToResources',
    component: <ButtonBack text='Back to Resource Library' action='/admin/resources' />,
  })

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