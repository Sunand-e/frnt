import React from 'react';
import Button from '../common/Button';
import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
// import UserRoleSelect from './inputs/UserRoleSelect';
import ColorPickerInputLegacy from '../common/inputs/ColorPickerInputLegacy';
import ImageDropzoneInput from '../common/inputs/ImageDropzoneInput';
import useUploadAndNotify from '../../hooks/useUploadAndNotify';
import CheckboxInput from '../common/inputs/CheckboxInput';
import FontFamilySelectInput from '../common/inputs/FontFamilySelectInput';

interface TenantFormValues {
  id?: string
  name: string
  shortName: string
  url: string
  profileImage: string
  primaryBrandColor: string
  secondaryBrandColor: string
  styles: {
    headings: {
      font: string
    }
    body: {
      font: string
    }
  }
  pathwaysEnabled: boolean
  organisationsEnabled: boolean
  showSendFeedbackButtonCourseSetting: boolean
  showSendCourseFeedbackButton: boolean
}

const TenantForm = ({tenant=null, onSubmit}) => {

  const defaultValues = {
    ...tenant,
    name: tenant?.name,
    url: tenant?.url,
    id: tenant?.id,
    pathwaysEnabled: tenant?.settings?.pathways?.enabled,
    organisationsEnabled: tenant?.settings?.organisations?.enabled,
    showSendFeedbackButtonCourseSetting: tenant?.settings?.courses?.showSendFeedbackButtonCourseSetting,
    showSendCourseFeedbackButton: tenant?.settings?.courses?.showSendCourseFeedbackButton,
  }
  
  const endpoint = "/api/v1/tenant/update"
  const method = "PUT"

  const { uploadFilesAndNotify } = useUploadAndNotify({
    additionalParams: { tenant_id: tenant?.id },
    method
  })

  const { watch, register, handleSubmit: rhfHandleSubmit, formState: { errors }, control } = useForm<TenantFormValues>({
    defaultValues
  });

  const handleSubmit = async (data) => {
    await Promise.all([
      data.logo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_image: data.logo})),
      data.whiteLogo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_white_image: data.whiteLogo})),
      data.squareLogo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_square_image: data.squareLogo})),
      data.squareWhiteLogo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_square_white_image: data.squareWhiteLogo})),
      data.emailLogo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_for_emails_image: data.emailLogo}))
    ]).then(res => {
      onSubmit(data)
    })
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
            message: 'Tenant name is required',
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
      {errors.name && errors.name.type === "required" && <span>Tenant short name is required</span>}
      {errors.name && errors.name.type === "maxLength" && <span>The tenant short name should be no longer than 20 characters</span> }
      <TextInput
        label="URL"
        placeholder="url"
        inputAttrs={register("url", { maxLength: 50 })}
      />
      <ImageDropzoneInput
        buttonText="Choose tenant logo"
        label="Company logo"
        control={control}
        name="logo"
        initialValue={tenant?.logos.logo}
        />
      <ImageDropzoneInput
        buttonText="Choose logo (white)"
        label="Company logo (white)"
        control={control}
        name="whiteLogo"
        previewClassName="bg-black/40"
        initialValue={tenant?.logos.logo_white}
      />
      <ImageDropzoneInput
        buttonText="Choose logo (square)"
        label="Company logo (square)"
        control={control}
        name="squareLogo"
        initialValue={tenant?.logos.logo_square}
      />
      <ImageDropzoneInput
        buttonText="Choose logo (white, square)"
        label="Company logo (white, square)"
        control={control}
        name="squareWhiteLogo"
        previewClassName="bg-black/40"
        initialValue={tenant?.logos.logo_square_white}
      />
      <ImageDropzoneInput
        buttonText="Choose logo for emails (white)"
        label="Logo for email headers (white)"
        control={control}
        name="emailLogo"
        previewClassName="bg-black/40"
        initialValue={tenant?.logos.logo_for_emails}
      />
      <ColorPickerInputLegacy
        label="Primary brand colour"
        name="settings.primaryBrandColor"
        control={control}
      />
      <ColorPickerInputLegacy
        label="Secondary brand colour"
        name="settings.secondaryBrandColor"
        control={control}
      />
      <FontFamilySelectInput
        label="Headings font"
        name="settings.styles.headings.font"
        control={control}
      />
      <FontFamilySelectInput
        label="Body font"
        name="settings.styles.body.font"
        control={control}
      />
      <hr></hr>
      <h2>Feature settings</h2>
      <h3>Courses</h3>
      <CheckboxInput
        label="Show 'Allow users to send course feedback' course setting"
        inputAttrs={register("showSendFeedbackButtonCourseSetting")}
      />
      <CheckboxInput
        label="Show 'Send feedback' button if course setting is set to 'on'"
        inputAttrs={register("showSendCourseFeedbackButton")}
      />
      <h3>Pathways</h3>
      <CheckboxInput
        label="Enable pathways"
        inputAttrs={register("pathwaysEnabled")}
      />
      <h3>Organisations</h3>
      <CheckboxInput
        label="Enable organisations"
        inputAttrs={register("organisationsEnabled")}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default TenantForm
