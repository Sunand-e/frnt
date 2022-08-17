import Button from '../Button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TextInput from '../common/inputs/TextInput';
import RTEInput from '../common/inputs/RTEInput';
import { resourceTypes } from './resourceTypes';
import ResourceFileInput from './ResourceFileInput';
import ResourcePreview from './ResourcePreview';
import DividerWithText from '../common/DividerWithText';
import ResourceUrlInput from './ResourceURLInput';

interface ResourceFormValues {
  title: string
  resource
  type: null | string
}
  
const ResourceForm = ({resource=null, onSubmit}) => {
  
  const [type, setType] = useState(null)

    const defaultValues = {
    ...resource,
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
      { type ? (
        <ResourcePreview type={type} control={control} onRemove={() => setType(null)} />
      ) : (
        <>
          <ResourceFileInput setType={setType} label="Resource" name="resource" control={control}/>
          <DividerWithText text={'OR'} />
          <ResourceUrlInput
            setType={setType}
            inputAttrs={register("resource", {
              required: "Resource name is required",
              maxLength: 20
            })}
          />
        </>
      )}
      <Button type="submit">Create resource</Button>
      <pre>
        { JSON.stringify(formVals,null,2) }
      </pre>
    </form>
    
  )
}

export default ResourceForm
