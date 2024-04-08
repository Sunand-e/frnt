import Button from '../common/Button';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import TextInput from '../common/inputs/TextInput';
import RTEInput from '../common/inputs/RTEInput';
import ResourcePreview from './ResourcePreview';
import ResourceReselect from './ResourceReselect';
import ResourceTypeSelector from './ResourceTypeSelector';
import { useRouter } from 'next/router';
import { resourceTypes } from './resourceTypes';
import TagSelectInput from '../tags/inputs/TagSelectInput';
import ImageSelectInput from '../common/inputs/ImageSelectInput';
import TipTapInput from '../common/inputs/TipTapInput';

interface ResourceFormValues {
  title: string
  resourceValue
  tags: [any]
  type: null | {[key: string]: any}
  image: any
}
  
const ResourceForm = ({resource=null, onSubmit}) => {
  
const router = useRouter()
  
  const isUrl = ['link','video'].includes(resource?.contentType)
  
  let defaultResourceValue
  if(isUrl) {
    defaultResourceValue = resource?.content?.url
  } else {
    defaultResourceValue = resource?.[resource.contentType]
  }

  const defaultValues = {
    ...(resource?.id && { id: resource.id }),
    resourceValue: defaultResourceValue,
    type: resource && {name: resource.contentType, ...resourceTypes[resource.contentType]},
    title: resource?.title,
    // description: resource?.content?.description
    description: resource?.content?.description,
    tags: resource?.tags?.edges.map(({node}) => {
      const {__typename, image, ...value} = node
      return value
    }) || [],
    image: resource?.image || null
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
    
    const resourceValues = ['link','video'].includes(type.name) ? ({
      content: { url: resourceValue }
    }) : ({
      mediaItemId: resourceValue?.id
    })

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
    }
  }

  const submitButtonText = resource ? `Update ${type?.name} resource` : `Add ${type?.name} to resource library`

  return (!typeSelected && !resource) ? (
    <ResourceTypeSelector control={control} />
  ) : (
    <form
      className='h-full w-full max-w-screen-lg flex flex-col space-y-4'
      onSubmit={rhfHandleSubmit(handleSubmit)}
    >
      <TextInput
        label={type?.titleLabel ?? 'Title'}
        placeholder="Resource name"
        inputAttrs={register("title", {
          required: "Resource name is required",
          maxLength: {
            value: 120,
            message: "The resource name must have no more than 120 characters"
          }
        })}
      />
      {errors.title && (<small className="text-danger text-red-500">{errors.title.message}</small>)}

      <TagSelectInput
        control={control}
        tagType="category"
        label="Categories"
        isMulti={true}
      />
      
      <TipTapInput
        placeholder={'Enter description here...'}
        label={`Description`}
        name='description'
        control={control}
        content={resource?.content?.description}
      />
      {/* <RTEInput initialValue={resource?.content?.description} label="Description" name="description" control={control}/> */}
      { resourceValue ? (
        <ResourcePreview control={control} onRemove={() => setValue('resourceValue', null)} />
      ) : (
        <ResourceReselect control={control} />
      )}

      { ['link','document','audio'].includes(type.name) && (
        <div className='max-w-lg shadow bg-main/10'>
          <ImageSelectInput
          buttonText="Thumbnail image (optional)"
          origImage={defaultValues?.image}
          control={control}
          name="imageId"
          // inputAttrs={register("image", { required: true })}
          />
        </div>
      )}

      { resourceValue && <Button type="submit">{submitButtonText}</Button> }
      {/* <pre>
      { JSON.stringify(formVals,null,2) }
      </pre> */}
    </form>
  )
}

export default ResourceForm
