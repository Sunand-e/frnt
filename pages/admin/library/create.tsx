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
import NewResourceSelector from '../../../components/admin/resources/NewResourceSelector'
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";
import useHeaderButtons from "../../../hooks/useHeaderButtons";


const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to Library list</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)


const CreateResourcePage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()

  const { handleModal, closeModal } = useContext(ModalContext);

  usePageTitle({
    title: "New Library Item"
  })

  useHeaderButtons([
    [<BackButton />, '/admin/library']
  ])


  const { createResource, resource } = useCreateResource()
  
  const goToResourceEditor = data => {
    router.push({
      pathname: '/admin/library/edit',
      query: { id: data?.createResource?.resource.id },
    })
    closeModal()
  }

  const onSubmit = (values) => {
    
    createResource(values, goToResourceEditor)

    handleModal({
      content: <LoadingSpinner />
    })
  }

  interface ResourceSetupFormValues {
    title: string
    imageId: string
    accessType: string
  }

  const { register, handleSubmit, control } = useForm<ResourceSetupFormValues>();

  return (
    // <div className='h-full w-full max-w-lg mx-auto'>
    <>
      <form
        className='h-full w-full max-w-sm flex flex-col space-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label="Title"
          placeholder="Untitled item"
          inputAttrs={register("title")}
        />
        <ImageSelectInput
          placeholder={'https://picsum.photos/640/360'}
          buttonText="Choose image"
          control={control}
          name="imageId"
        />
      </form>
      </>
  )
}

CreateResourcePage.navState = {
  topLevel: 'library',
  // secondary: 'library'
}

export default CreateResourcePage
