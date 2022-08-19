import Button from '../Button';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import TextInput from '../common/inputs/TextInput';
import RTEInput from '../common/inputs/RTEInput';
import ResourcePreview from './ResourcePreview';
import ResourceReselect from './ResourceReselect';
import ResourceTypeSelector from './ResourceTypeSelector';
import { useRouter } from 'next/router';
import { resourceTypes } from './resourceTypes';

interface ResourceFormValues {
  title: string
  resourceValue
  type: null | {[key: string]: any}
}
  
const ResourceForm = ({resource=null, onSubmit}) => {
  
const router = useRouter()
  
  const isUrl = ['link','video'].includes(resource?.contentType)
  
  const defaultValues = {
    ...(resource?.id && { id: resource.id }),
    resourceValue: (isUrl ? resource?.content?.url : resource?.mediaItem) || null,
    type: resource && {name: resource.contentType, ...resourceTypes[resource.contentType]},
    title: resource?.title
  }

  const { watch, register, setValue, handleSubmit: rhfHandleSubmit, control, setFocus, formState: { errors } } = useForm<ResourceFormValues>({
    defaultValues
  });

  const formVals = watch()
  const { type, resourceValue, title } = formVals
  const [typeSelected, setTypeSelected] = useState(false)

  const handleSubmit = formValues => {
    // 'values' in this case will be just 'title', and 'id' too if editing (19/08/2022)
    const {resourceValue, type, description, ...values} = formValues
    let resourceValues
    switch(type.name) {
      case 'document':
      case 'image':
      case 'audio':
        resourceValues = { mediaItemId: resourceValue?.id}
        break;
      case 'video':
      case 'link':
        resourceValues = { content: { url: resourceValue }}
        break;
    }

    const queryValues = {
      ...values,
      ...resourceValues,
      content: {
        ...resourceValues.content,
        description,
      },
      contentType: type.name
    }
    
    onSubmit(queryValues)
    
    router.push('/admin/resources')
  }

  useEffect(() => {
    if(type && resourceValue) {
      setTypeSelected(true)
      !title && setTitle(resourceValue)
      // setFocus('title')
    }
  },[type, resourceValue])

  const setTitle = (resource) => {
    switch(type?.name) {
      case 'document':
      case 'image':
      case 'audio':
        !title && setValue('title', resource.fileName.replace(/\.[^/.]+$/, ""))
        break;
      case 'video':
        break;
      case 'link':
        break;
    }
  }

  const submitButtonText = resource ? `Update ${type?.name} resource` : `Add ${type?.name} to resource library`

  return (!typeSelected && !resource) ? (
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
          maxLength: 50
        })}
      />
      {errors.title && (<small className="text-danger text-rose-800">{errors.title.message}</small>)}
      <RTEInput label="Description" name="description" control={control}/>
      { resourceValue ? (
        <>
          <ResourcePreview control={control} onRemove={() => setValue('resourceValue', null)} />
          <Button type="submit">{submitButtonText}</Button>
        </>
      ) : (
        <ResourceReselect control={control} />
      )}
      {/* <pre>
      { JSON.stringify(formVals,null,2) }
      </pre> */}
    </form>
  )
}

export default ResourceForm
