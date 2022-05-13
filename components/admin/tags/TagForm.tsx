import Button from '../../Button';
import { useForm } from 'react-hook-form';
import TextInput from '../../common/inputs/TextInput';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import TagTypeSelect from './inputs/TagTypeSelect';
import ImageSelectInput from '../../common/inputs/ImageSelectInput';
import { ModalContext } from '../../../context/modalContext';

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
  
  const { register, handleSubmit, control, setFocus, getValues } = useForm<TagFormValues>(
    { defaultValues }
  );

  useEffect(() => {
    setFocus('label')
  },[])

  const buttonText = tag ? 'Save changes' : 'Create tag'
  
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
        inputAttrs={register("label")}
      />
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