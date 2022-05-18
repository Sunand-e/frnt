import usePageTitle from '../../../hooks/usePageTitle'
import { useRouter } from '../../../utils/router'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import { useState, useEffect, useContext } from 'react'
import Button from '../../../components/Button'
import { v4 as uuidv4 } from 'uuid';
import { CreatePathway, CreatePathwayVariables } from '../../../graphql/mutations/pathway/__generated__/CreatePathway';
import { GetPathways } from '../../../graphql/queries/__generated__/GetPathways';
import { ModalContext } from '../../../context/modalContext'
import TextInput from '../../../components/common/inputs/TextInput'
import { useForm } from 'react-hook-form'
import CheckboxInput from '../../../components/common/inputs/CheckboxInput'
import SelectInput from '../../../components/common/inputs/SelectInput'
import ImageSelectInput from '../../../components/common/inputs/ImageSelectInput'
import { useMutation } from '@apollo/client'
import { CREATE_PATHWAY } from '../../../graphql/mutations/pathway/CREATE_PATHWAY'
import { GET_PATHWAYS } from '../../../graphql/queries/allQueries'
import LoadingSpinner from '../../../components/LoadingSpinner'
import useCreatePathway from '../../../hooks/pathways/useCreatePathway'

const AdminPathwaySetup = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
    */
  const router = useRouter()
   
  const { createPathway } = useCreatePathway()

  const { handleModal, closeModal } = useContext(ModalContext);

  usePageTitle({ 
    title: "New pathway"
  })

  useEffect(() => {
    headerButtonsVar(
      <Button onClick={() => router.push('/admin/pathways')}>Back to Pathways</Button>
    )
  },[])

  const onSubmit = (formValues) => {
    
    const { title, imageId, ...settings } = formValues
    // setSubmitted(values);
    const values = {
      title,
      imageId,
      ...settings
    }

    createPathway(values, ({createPathway: {pathway}} ) => {
      closeModal()
        router.push({
          pathname: `/admin/pathways/edit`,
          query: {
            id: pathway.id
          }
        })
      }
    )

    handleModal({
      content: <LoadingSpinner />
    })
  }

  interface PathwaySetupFormValues {
    title: string
    imageId: string
    accessType: string
    pathwayPrice: string
    enablePrerequisites: boolean
    disableProgression: boolean
  }

  const { register, handleSubmit, control } = useForm<PathwaySetupFormValues>();

  return (
    // <div className='h-full w-full max-w-lg mx-auto'>
    <>
      <form
        className='h-full w-full max-w-sm flex flex-col space-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label="Pathway name"
          placeholder="Untitled pathway"
          inputAttrs={register("title", { /*maxLength: 20*/ })}
        />
        <ImageSelectInput
          placeholder={'https://picsum.photos/640/360'}
          buttonText="Choose pathway image"
          control={control}
          name="imageId"
          // inputAttrs={register("image", { required: true })}
        />
        <SelectInput
          label="Pathway access type"
          options={["Open access", "Assignable", "Paid access"]}
          inputAttrs={register("accessType")}
        />
        <TextInput
          label="Pathway price"
          placeholder="Untitled pathway"
          inputAttrs={register("pathwayPrice")}
        />
        <CheckboxInput
          label="Enable prerequisites"
          inputAttrs={register("enablePrerequisites")}
        />
        <CheckboxInput
          label="Disable course progression"
          inputAttrs={register("disableProgression")}
        />
        <Button type="submit">Pathway Builder</Button>
        {/* <p className='text-lg font-bold mt-4'>Create your first pathway item:</p>
        <AddItemToPathwayForm sectionId={123} /> */}
      </form>
      </>
  )
}

AdminPathwaySetup.navState = {
  topLevel: 'courses',
  secondary: 'pathways'
}

export default AdminPathwaySetup