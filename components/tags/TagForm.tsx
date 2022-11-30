import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import TextInput from '../common/inputs/TextInput';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ImageSelectInput from '../common/inputs/ImageSelectInput';
import { ModalContext } from '../../context/modalContext';

interface TagFormValues {
  label: string
  mediaItemId: string
}

const TagForm = ({tag=null, onSubmit, isModal=false}) => {

  const defaultValues = {
    tagType: 'category',
    ...tag
  }
  const { handleModal } = useContext(ModalContext)
  
  const { register, handleSubmit, control, setFocus, getValues, formState: { errors } } = useForm<TagFormValues>(
    { defaultValues }
  );

  useEffect(() => {
    setFocus('label')
  },[])

  const buttonText = tag ? 'Save changes' : 'Create category'
  
  const reopenFormInModal = (image) => {
    handleModal({
      title: `Course settings`,
      size: 'lg',
      content: <TagForm tag={{...getValues(), image}} isModal={true} onSubmit={onSubmit} />
    })
  }

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Category Name"
        placeholder="Untitled category"
        inputAttrs={register("label", {
          required: "Category name is required"
        })}
      />
      {errors.label && (<small className="text-danger text-red-500">{errors.label.message}</small>)}
      <ImageSelectInput
        label="Category image"
        origImage={tag?.image}
        placeholder={'https://picsum.photos/640/360'}
        buttonText="Choose category image"
        control={control}
        name="mediaItemId"
        onSelect={isModal ? reopenFormInModal : null}
        // inputAttrs={register("image", { required: true })}
      />
      {/* <TagTypeSelect control={control} /> */}

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}

export default TagForm
