import React from 'react';
import Button from '../common/Button';
import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import useUploadAndNotify from '../../hooks/useUploadAndNotify';
import TextAreaInput from '../common/inputs/TextAreaInput';
import FileDropzoneInput from '../common/inputs/FileDropzoneInput';
import DropzoneIconAndText from '../common/inputs/DropzoneIconAndText';
import FontDropzoneInput from './FontDropzoneInput';

interface TenantFontsFormValues {
  id?: string
  name: string
  description?: string
  file: File
}

const TenantFontsForm = ({tenant=null}) => {

  const defaultValues = {
    id: tenant.id,
    name: '',
    description: ''
  }

  const endpoint = "/api/v1/tenant/upload_fonts"
  const method = "post"

  const { watch, register, setValue, handleSubmit: rhfHandleSubmit, formState: { errors }, control } = useForm<TenantFormValues>({
    defaultValues
  });

  const { uploadFilesAndNotify } = useUploadAndNotify({
    additionalParams: { 
      tenant_id: tenant?.id,
    },
    method
  })
  const handleSubmit = async (data) => {
    if(data.file instanceof File) {
      const fileParams = {
        file: data.file,
        ...(data.file_bold instanceof File && {file_bold: data.file_bold}),
        ...(data.file_italic instanceof File && {file_italic: data.file_italic})
      }
      try {
        const result = await uploadFilesAndNotify(endpoint, fileParams, {name: data.name});
      } catch (error) {
        // console.error(error)
      }
    }
  }

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={rhfHandleSubmit(handleSubmit)}
    >
      <FontDropzoneInput
        label='Standard font file'
        control={control}
        setValue={setValue}
        name='file'
      />
      <TextInput
        label="Name"
        placeholder="Name"
        inputAttrs={register("name", { 
          maxLength: {
            value: 30,
            message: 'Tenant name is required',
          },
          required: true, 
        })}
      />
      {errors.name && errors.name.type === "required" && <span role="alert">{errors.name.message}</span>}
      {errors.name && errors.name.type === "maxLength" && <span role="alert">{errors.name.message}</span> }
      {/* <TextAreaInput
        label="Description (optional)"
        inputAttrs={register("description", { 
        })}
      /> */}
      <FontDropzoneInput
        label='Bold font file (optional)'
        control={control}
        setValue={setValue}
        name='file_bold'
      />
      <FontDropzoneInput
        label='Italic font file (optional)'
        control={control}
        setValue={setValue}
        name='file_italic'
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default TenantFontsForm
