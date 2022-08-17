import Button from '../Button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import TextInput from '../common/inputs/TextInput';
import RTEInput from '../common/inputs/RTEInput';
import ResourcePreview from './ResourcePreview';
import ResourceTypeSelector from './ResourceTypeSelector';

interface ResourceFormValues {
  title: string
  resourceValue
  type: null | {[key: string]: any}
}
  
const ResourceForm = ({resource=null, onSubmit}) => {
  
  const defaultValues = {
    resourceValue: null,
    type: null,
    title: null,
    ...resource,
  }

  const { watch, register, setValue, handleSubmit: rhfHandleSubmit, control, setFocus, formState: { errors } } = useForm<ResourceFormValues>({
    defaultValues
  });

  const formVals = watch()
  const { type, resourceValue } = formVals

  const router = useRouter()

  const handleSubmit = values => {
    onSubmit(values)
    router.push('/admin/resources')
  }

  useEffect(() => {
    if(resourceValue) {
      setFocus('title')
    }
  },[resourceValue])

  return !resourceValue ? (
    <ResourceTypeSelector control={control} />
  ) : (
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
      <ResourcePreview control={control} onRemove={() => setValue('resourceValue', null)} />
      <Button type="submit"><>Add {type?.name} to resource library</></Button>
    </form>
  )
}

export default ResourceForm
