import usePageTitle from '../../../hooks/usePageTitle'
import { useRouter } from '../../../utils/router'
import React, { useState, useEffect, useContext } from 'react'
import Button from '../../../components/common/Button'
import TextInput from '../../../components/common/inputs/TextInput'
import { useForm } from 'react-hook-form'
import CheckboxInput from '../../../components/common/inputs/CheckboxInput'
import SelectInput from '../../../components/common/inputs/SelectInput'
import ImageSelectInput from '../../../components/common/inputs/ImageSelectInput'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import useCreatePathway from '../../../hooks/pathways/useCreatePathway'
import useHeaderButtons from "../../../hooks/useHeaderButtons";
import { closeModal, handleModal } from '../../../stores/modalStore'
import ButtonBack from '../../../components/common/ButtonBack'
import TagSelectInput from '../../../components/tags/inputs/TagSelectInput'
import useGetPathways from '../../../hooks/pathways/useGetPathways'

const AdminPathwaySetup = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
    */
  const router = useRouter()

  const { createPathway } = useCreatePathway()
  const { pathways } = useGetPathways()

  usePageTitle({
    title: "New pathway"
  })

  useHeaderButtons({
    id: 'backToPathways',
    component: <ButtonBack action={'/admin/pathways'} text='Back to Pathways' />
  })

  const onSubmit = (formValues) => {

    const { title, imageId, ...settings } = formValues
    // setSubmitted(values);
    const values = {
      title,
      imageId,
      ...settings
    }

    createPathway(values, ({ createPathway: { pathway } }) => {
      closeModal()
      router.push({
        pathname: `/admin/pathways/edit`,
        query: {
          pid: pathway.id
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

  const { register, handleSubmit, control, formState: { errors } } = useForm<PathwaySetupFormValues>();

  return (
    <>
      <form
        className='h-full w-full max-w-sm flex flex-col space-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label="Pathway name"
          placeholder="Untitled pathway"
          inputAttrs={register("title", {
            required: "Pathway name is required"
          })}
        />
        {errors.title && (<small className="text-danger text-red-500">{errors.title.message}</small>)}
        <ImageSelectInput
          placeholder={'https://picsum.photos/640/360'}
          buttonText="Choose pathway image"
          control={control}
          name="imageId"
        />
        <TagSelectInput
          control={control}
          tagType="category"
          label="Categories"
          isMulti={true}
        />
        <Button type="submit">Pathway Builder</Button>
      </form>
    </>
  )
}

AdminPathwaySetup.navState = {
  topLevel: 'courses',
  secondary: 'pathways'
}

export default AdminPathwaySetup
