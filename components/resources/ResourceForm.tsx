import Button from '../Button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import TextInput from '../common/inputs/TextInput';
import { useState } from 'react';
import RTEInput from '../common/inputs/RTEInput';
import AudioSelectorInput from '../common/inputs/AudioSelectorInput';
import { resourceTypes } from './resourceTypes';
import ResourceTypeInput from './ResourceTypeInput';
import DateRangePickerInput from '../common/inputs/DateRangePickerInput';

interface ResourceFormValues {
  title: string
  type: string
}
  
const ResourceForm = ({resource=null, type, onSubmit}) => {

  

  const defaultValues = {
    ...resource,
    type,
    title: resource?.title
  }

  const { watch, register, handleSubmit: rhfHandleSubmit, control, setFocus, formState: { errors } } = useForm<ResourceFormValues>({
    defaultValues
  });

  useEffect(() => {
    setFocus('title')
  },[])

  const router = useRouter()

  const handleSubmit = values => {
    onSubmit(values)
    router.push('/admin/resources')
  }

  const formVals = watch()
  return (
    <form
      className='h-full w-full max-w-lg flex flex-col space-y-4'
      onSubmit={rhfHandleSubmit(handleSubmit)}
    >

      <TextInput
        label={type?.titleLabel ?? 'Title'}
        placeholder="Resource name"
        inputAttrs={register("title", {
          required: "Resource name is required",
          maxLength: 20
        })}
      />

      {errors.title && (<small className="text-danger text-rose-800">{errors.title.message}</small>)}
      <RTEInput label="Description" name="description" control={control}/>
      <ResourceTypeInput label="Resource" type={type} name="media_item" control={control}/>
      <Button type="submit">Create resource</Button>
      <pre>
        { JSON.stringify(formVals,null,2) }
      </pre>
    </form>
    
  )
}

export default ResourceForm
