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
import useCreateLibraryItem from '../../../hooks/libraryItems/useCreateLibraryItem'
import NewLibraryItemSelector from '../../../components/admin/libraryItems/NewLibraryItemSelector'

const AdminLibraryItemSetup = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()

  const { handleModal, closeModal } = useContext(ModalContext);

  usePageTitle({ 
    title: "New Library Item"
  })

  useEffect(() => {
    headerButtonsVar(
      <Button onClick={() => router.push('/admin/library')}>LibraryItem Editor</Button>
    )
  },[])


  const { createLibraryItem, libraryItem } = useCreateLibraryItem()
  
  const goToLibraryItemEditor = data => {
    router.push({
      pathname: '/admin/library/edit',
      query: { id: data?.createLibraryItem?.libraryItem.id },
    })
    closeModal()
  }

  const onSubmit = (values) => {
    
    createLibraryItem(values, goToLibraryItemEditor)

    handleModal({
      content: <LoadingSpinner />
    })
  }

  interface LibraryItemSetupFormValues {
    title: string
    imageId: string
    accessType: string
    libraryItemPrice: string
    enablePrerequisites: boolean
    disableProgression: boolean
  }

  const { register, handleSubmit, control } = useForm<LibraryItemSetupFormValues>();

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
        <NewLibraryItemSelector 
          control={control}
          name="contentType"
          onSelect={handleSubmit(onSubmit)}
        />
      </form>
      </>
  )
}

AdminLibraryItemSetup.navState = {
  topLevel: 'library',
  // secondary: 'library'
}

export default AdminLibraryItemSetup