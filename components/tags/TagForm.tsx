import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import TextInput from '../common/inputs/TextInput';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ImageSelectInput from '../common/inputs/ImageSelectInput';
import { handleModal } from '../../stores/modalStore';
import TagSelectInput from './inputs/TagSelectInput';
import useGetTags from '../../hooks/tags/useGetTags';

interface TagFormValues {
  label: string
  mediaItemId: string
  parentTag: any
}

const TagForm = ({tag=null, onSubmit, isModal=false}) => {

  const { tags, loading, error } = useGetTags()
  const parentTag = tags.find(t => t.id === tag.parent.id)

  const defaultValues = {
    tagType: 'category',
    parentTag,
    ...tag
  }
  const { register, handleSubmit, control, setFocus, getValues, watch, formState: { errors } } = useForm<TagFormValues>(
    { defaultValues }
  );

  const formVals = watch()

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

  const onFormSubmit = (vals) => {
    const {parentTag, ...values} = vals
    onSubmit({...values, parentId: parentTag.id})
  }
  
  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <TextInput
        label="Category Name"
        placeholder="Untitled category"
        inputAttrs={register("label", {
          required: "Category name is required"
        })}
      />
      <TagSelectInput
        name="parentTag"
        control={control}
        tagType="category"
        label="Parent category"
        isMulti={false}
        idOnly={true}
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
