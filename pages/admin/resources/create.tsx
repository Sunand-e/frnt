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

  useHeaderButtons([
    [<BackButton />, '/admin/resources']
  ])

  const { createResource, resource } = useCreateResource()

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