import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import TextInput from '../common/inputs/TextInput';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ImageSelectInput from '../common/inputs/ImageSelectInput';
import { handleModal } from '../../stores/modalStore';
import TagSelectInput from './inputs/TagSelectInput';
import useGetTags from '../../hooks/tags/useGetTags';
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import { tagTypes } from '../common/tagTypes';

interface TagFormValues {
  label: string
  mediaItem: string
  parentTag: any
}

const TagForm = ({tag=null, typeName='category', onSubmit, isModal=false}) => {
  const tagType = tagTypes[typeName]
  const { tags, loading, error } = useGetTags()
  const parentTag = tags?.find(t => t.id === tag?.parent?.id)
  const { userHasCapability } = useUserHasCapability()
  const defaultValues = {
    tagType: tagType['name'],
    parentTag,
    ...tag
  }
  const { register, handleSubmit, control, setFocus, setValue, getValues, watch, formState: { errors } } = useForm<TagFormValues>(
    { defaultValues }
  );

  const formVals = watch()

  useEffect(() => {
    setFocus('label')
  },[])

  useEffect(() => {
    setValue('parentTag', parentTag)
  },[tags])

  const buttonText = tag ? 'Save changes' : `Create ${tagType.name}`
  
  const reopenFormInModal = (image) => {
    console.log(image)
    handleModal({
      title: `Course settings`,
      size: 'lg',
      content: <TagForm typeName={typeName} tag={{...getValues(), image}} isModal={true} onSubmit={onSubmit} />
    })
  }

  const onFormSubmit = (vals) => {
    const {parentTag, image, ...values} = vals
    onSubmit({...values, parentId: parentTag?.id, mediaItemId: image?.id})
  }
  
  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <TextInput
        label={`${tagType.label} name`}
        placeholder={`Untitled ${tagType.name}`}
        inputAttrs={register("label", {
          required: `${tagType.label} name is required`,
        })}
      />
      {errors.label && (<small className="text-danger text-red-500">{errors.label.message}</small>)}
      {
        tagType.heirarchical &&
        userHasCapability('CreateSubTags') && (      
          <TagSelectInput
            name="parentTag"
            control={control}
            tagType={tagType.name}
            label={`Parent ${tagType.name}`}
            isMulti={false}
          />
        )
      }
      <ImageSelectInput
        label={`${tagType.label} image`}
        origImage={tag?.image}
        placeholder={'https://picsum.photos/640/360'}
        buttonText={`Select ${tagType.name} image`}
        control={control}
        closeOnSelect={false}
        name="image"
        valueAsObject={true}
        onSelect={isModal ? reopenFormInModal : null}
        // inputAttrs={register("image", { required: true })}
      />
      {/* <TagTypeSelect control={control} /> */}

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}

export default TagForm
