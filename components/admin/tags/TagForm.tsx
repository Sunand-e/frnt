import Button from '../../Button';
import { useForm } from 'react-hook-form';
import TextInput from '../../common/inputs/TextInput';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import TagTypeSelect from './inputs/TagTypeSelect';
import ImageSelectInput from '../../common/inputs/ImageSelectInput';

interface TagFormValues {
  label: string
}

const TagForm = ({tag=null, onSubmit}) => {

  const defaultValues = {
    tagType: 'category',
    ...tag
  }
  
  const { register, handleSubmit, control, setFocus } = useForm<TagFormValues>(
    { defaultValues }
  );

  useEffect(() => {
    setFocus('label')
  },[])

  const buttonText = tag ? 'Save changes' : 'Create tag'
  
  return (
    <form
      className='h-full w-full max-w-lg flex flex-col space-y-4'
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
        // inputAttrs={register("image", { required: true })}
      />
      {/* <TagTypeSelect control={control} /> */}

      <Button type="submit">{buttonText}</Button>
      <pre>
      { JSON.stringify(tag,null,2) }
      </pre>
    </form>
  )
}

export default TagForm