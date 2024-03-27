import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import TextInput from '../common/inputs/TextInput';
import React, { useContext, useEffect } from 'react';
import ImageSelectInput from '../common/inputs/ImageSelectInput';
import SelectInput from '../common/inputs/SelectInput';
import TagSelectInput from '../tags/inputs/TagSelectInput';
import CheckboxInput from '../common/inputs/CheckboxInput';
import { handleModal } from '../../stores/modalStore';

interface PathwayFormValues {
  title: string
  imageId: string
  image: string
  tags: [any]
  accessType: string
  pathwayPrice: string
  enablePrerequisites: boolean
  disableProgression: boolean
}

const PathwayForm = ({pathway=null, onSubmit, isModal=false, submitButtonText="Submit"}) => {

  const defaultValues = {
    ...pathway
  }

  const { register, watch, handleSubmit, control, setFocus, getValues, setValue, formState: { errors } } = useForm<PathwayFormValues>({defaultValues});

  useEffect(() => {
    setFocus('title')
  },[])

  const reopenFormInModal = (image) => {
    handleModal({
      title: `Pathway settings`,
      size: 'lg',
      content: <PathwayForm pathway={{...getValues(), image}} isModal={true} onSubmit={onSubmit} submitButtonText="Save settings" />
    })
  }

  return (
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
        // placeholder={'https://picsum.photos/640/360'}
        buttonText="Choose pathway image"
        origImage={defaultValues?.image}
        control={control}
        name="imageId"
        onSelect={isModal ? reopenFormInModal : null}
        // inputAttrs={register("image", { required: true })}
      />
      <TagSelectInput
        control={control}
        tagType="category"
        label="Categories"
        isMulti={true}
      />
      <SelectInput
        label="Pathway access type"
        options={[
          {
            label: "Open access",
            value: 'open'
          },
          {
            label: "Assignable",
            value: 'assignable'
          },
          {
            label: "Paid access",
            value: 'paid'
          },
        ]}
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
      {/* <CheckboxInput
        label="Disable lesson progression"
        inputAttrs={register("disableProgression")}
      /> */}
      <Button type="submit">{submitButtonText}</Button>
      {/* <p className='text-lg font-bold mt-4'>Create your first pathway item:</p>
      <AddItemToPathwayForm sectionId={123} /> */}
    </form>
  )
}

export default PathwayForm
