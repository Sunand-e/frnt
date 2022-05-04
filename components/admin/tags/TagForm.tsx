import Button from '../../Button';
import { useForm } from 'react-hook-form';
import TextInput from '../../common/inputs/TextInput';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import TagTypeSelect from './inputs/TagTypeSelect';

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
        label="Label"
        placeholder="Tag name"
        inputAttrs={register("label", { maxLength: 20 })}
      />
      {/* <TagTypeSelect control={control} /> */}

      <Button type="submit">{buttonText}</Button>
    </form>
  )
}

export default TagForm