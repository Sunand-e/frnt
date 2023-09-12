import React, { useContext } from 'react';
import Button from '../common/Button';
import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import useUploadAndNotify from '../../hooks/useUploadAndNotify';

interface BulkImportFormValues {
  id?: string
  name: string
}

const BulkImportForm = ({bulkImport=null, onSubmit}) => {

  const defaultValues = {
    ...bulkImport,
    name: bulkImport?.name,
  }

  const endpoint = "/api/v1/bulkImport/update"
  const method = "PUT"

  const { uploadFilesAndNotify } = useUploadAndNotify({
    additionalParams: { bulkImport_id: bulkImport?.id },
    method
  })

  const { watch, register, handleSubmit: rhfHandleSubmit, formState: { errors }, control } = useForm<BulkImportFormValues>({
    defaultValues
  });

  const formVals = watch()

  const handleSubmit = async (data) => {
    onSubmit(data)
  }

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={rhfHandleSubmit(handleSubmit)}
    >
      <TextInput
        label="Name"
        placeholder="Name"
        inputAttrs={register("name", { 
          maxLength: {
            value: 30,
            message: 'BulkImport name is required',
          },
          required: true, 
        })}
      />
      {errors.name && errors.name.type === "required" && <span role="alert">{errors.name.message}</span>}
      {errors.name && errors.name.type === "maxLength" && <span role="alert">{errors.name.message}</span> }
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default BulkImportForm
