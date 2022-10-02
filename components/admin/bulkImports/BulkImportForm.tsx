import React, { useContext } from 'react';
import Button from '../../Button';
import TextInput from '../../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
// import UserRoleSelect from './inputs/UserRoleSelect';
import ColorPickerInput from '../../common/inputs/ColorPickerInput';
import ImageDropzoneInput from '../../common/inputs/ImageDropzoneInput';
import useUploadAndNotify from '../../../hooks/useUploadAndNotify';

interface BulkImportFormValues {
  id?: string
  name: string
  shortName: string
  url: string
  profileImage: string
  primaryBrandColor: string
  secondaryBrandColor: string
}

const BulkImportForm = ({bulkImport=null, onSubmit}) => {

  const defaultValues = {
    ...bulkImport,
    name: bulkImport?.name,
    url: bulkImport?.url,
    id: bulkImport?.id,
    primaryBrandColor: bulkImport?.settings?.primaryBrandColor,
    secondaryBrandColor: bulkImport?.settings?.secondaryBrandColor,
  }

  const endpoint = "/api/v1/bulkImport/update"
  const method = "PUT"

  const { uploadFileAndNotify } = useUploadAndNotify({
    additionalParams: { bulkImport_id: bulkImport?.id },
    method
  })

  const { watch, register, handleSubmit: rhfHandleSubmit, formState: { errors }, control } = useForm<BulkImportFormValues>({
    defaultValues
  });

  const formVals = watch()

  const handleSubmit = async (data) => {

    await Promise.all([
      data.logo instanceof File && await uploadFileAndNotify(data.logo, 'logo_image', endpoint),
      data.whiteLogo instanceof File && await uploadFileAndNotify(data.whiteLogo, 'logo_white_image', endpoint),
      data.squareLogo instanceof File && await uploadFileAndNotify(data.squareLogo, 'logo_square_image', endpoint),
      data.squareWhiteLogo instanceof File && await uploadFileAndNotify(data.squareWhiteLogo, 'logo_square_white_image', endpoint)
    ]).then(res => {
      console.log('resresresresresresresresresres')
      console.log(res)
      onSubmit(data)
    }
    )
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
      <TextInput
        label="Short name"
        placeholder="Short name"
        inputAttrs={register("shortName", { maxLength: 20 })}
      />
      {errors.name && errors.name.type === "required" && <span>BulkImport short name is required</span>}
      {errors.name && errors.name.type === "maxLength" && <span>The bulkImport short name should be no longer than 20 characters</span> }
      <TextInput
        label="URL"
        placeholder="url"
        inputAttrs={register("url", { maxLength: 50 })}
      />
      <ImageDropzoneInput
        buttonText="Choose bulkImport logo"
        label="Company logo"
        control={control}
        name="logo"
        initialValue={bulkImport?.logos.logo}
        />
      <ImageDropzoneInput
        buttonText="Choose logo (white)"
        label="Company logo (white)"
        control={control}
        name="whiteLogo"
        previewClassName="bg-black/40"
        initialValue={bulkImport?.logos.logo_white}
      />
      <ImageDropzoneInput
        buttonText="Choose logo (square)"
        label="Company logo (square)"
        control={control}
        name="squareLogo"
        initialValue={bulkImport?.logos.logo_square}
      />
      <ImageDropzoneInput
        buttonText="Choose logo (white, square)"
        label="Company logo (white, square)"
        control={control}
        name="squareWhiteLogo"
        previewClassName="bg-black/40"
        initialValue={bulkImport?.logos.logo_square_white}
      />
      <ColorPickerInput
        label="Primary brand colour"
        name="primaryBrandColor"
        control={control}
      />
      <ColorPickerInput
        label="Secondary brand colour"
        name="secondaryBrandColor"
        control={control}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default BulkImportForm
