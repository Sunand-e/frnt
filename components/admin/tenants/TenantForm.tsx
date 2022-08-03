import React, { useContext } from 'react';
import Button from '../../Button';
import ImageSelectInput from '../../common/inputs/ImageSelectInput';
import SelectInput from '../../common/inputs/SelectInput';
import TextInput from '../../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import CheckboxInput from '../../common/inputs/CheckboxInput';
// import UserRoleSelect from './inputs/UserRoleSelect';
import Link from 'next/link';
import { ModalContext } from '../../../context/modalContext';
import ColorPickerInput from '../../common/inputs/ColorPickerInput';
import ImageDropzoneInput from '../../common/inputs/ImageDropzoneInput';
import useUploadAndNotify from '../../../hooks/useUploadAndNotify';

interface TenantFormValues {
  id?: string
  name: string
  shortName: string
  url: string
  profileImage: string
  primaryBrandColor: string
  secondaryBrandColor: string
}

const TenantForm = ({tenant=null, onSubmit}) => {

  const defaultValues = {
    ...tenant,
    name: tenant?.name,
    url: tenant?.url,
    primaryBrandColor: tenant?.settings?.primaryBrandColor,
    secondaryBrandColor: tenant?.settings?.secondaryBrandColor,
    tenantImage: ''
  }

  const endpoint = "/api/v1/tenant/update"
  const method = "PUT"

  const { uploadFileAndNotify: uploadCompanyLogo } = useUploadAndNotify({
    fileParameterName: "profile_image",
    endpoint,
    method
  })
  const { uploadFileAndNotify: uploadSquareLogo } = useUploadAndNotify({
    fileParameterName: "login_image",
    endpoint,
    method
  })

  const { watch, register, handleSubmit: rhfHandleSubmit, formState: { errors }, control } = useForm<TenantFormValues>({
    defaultValues
  });

  const big = watch()

  const handleSubmit = (data) => {
    console.log('data.companyLogo')
    console.log(data.companyLogo)
    console.log('data.squareLogo')
    console.log(data.squareLogo)
    data.companyLogo && uploadCompanyLogo(data.companyLogo)
    data.squareLogo && uploadSquareLogo(data.squareLogo)
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
        inputAttrs={register("name", { maxLength: {
            value: 20,
            message: 'Max length is 20'
          } })}
      />
      {errors.name && "Name is required"}
      <TextInput
        label="Short name"
        placeholder="Short name"
        inputAttrs={register("shortName", { maxLength: 20 })}
      />
      <TextInput
        label="URL"
        placeholder="url"
        inputAttrs={register("url", { maxLength: 40 })}
      />
      <ImageDropzoneInput
        buttonText="Choose tenant image"
        label="Company logo"
        control={control}
        name="companyLogo"
        />
      <ImageDropzoneInput
        buttonText="Choose tenant image"
        label="Company logo (square)"
        control={control}
        name="squareLogo"
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
      <pre>
      { JSON.stringify(big,null,2) }
      </pre>
    </form>
  );
}

export default TenantForm
