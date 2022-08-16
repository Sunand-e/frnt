import usePageTitle from '../../../hooks/usePageTitle'
import { useRouter } from '../../../utils/router'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import { useState, useEffect, useContext } from 'react'
import Button from '../../../components/Button'
import { ModalContext } from '../../../context/modalContext'
import TextInput from '../../../components/common/inputs/TextInput'
import { useForm } from 'react-hook-form'
import ImageSelectInput from '../../../components/common/inputs/ImageSelectInput'
import LoadingSpinner from '../../../components/LoadingSpinner'
import useCreateResource from '../../../hooks/resources/useCreateResource'
import ResourceTypeSelector from '../../../components/resources/ResourceTypeSelector'
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
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */

  usePageTitle({
    title: "New Library Item"
  })

  useHeaderButtons([
    [<BackButton />, '/admin/resources']
  ])


  const { createResource, resource } = useCreateResource()

  const [resourceType, setResourceType] = useState(null)

  const handleSubmit = (values) => {
    createResource(values)
  }

  return (
    <>
      { resourceType ? (
        <ResourceForm type={resourceType} onSubmit={handleSubmit} />
      ) : (
        <ResourceTypeSelector onSelect={setResourceType} />
      )}
    </>
  )
}

CreateResourcePage.navState = {
  topLevel: 'resources',
}

export default CreateResourcePage
