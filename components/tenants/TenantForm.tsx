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
import BoxContainer from '../common/containers/BoxContainer';
import { contentTypes } from '../common/contentTypes';
import { Users } from "@styled-icons/fa-solid/Users"
import { Group2 } from "@styled-icons/remix-fill/Group2"
import { PeopleTeamToolbox } from "@styled-icons/fluentui-system-filled/PeopleTeamToolbox"
interface TenantFeatureSettings {
  courses: {
    enabled: boolean
    showSendFeedbackButtonCourseSetting: boolean
    showSendCourseFeedbackButton: boolean
    builder: {
      enabled: boolean
    }
    reports: {
      enabled: boolean
    }
  }
  certificates: {
    awardingBodyText: string
  }
  resources: {
    enabled: boolean
    reports: {
      enabled: boolean
    }
  }
  pathways: {
    enabled: boolean
    reports: {
      enabled: boolean
    }
  }
  groups: {
    enabled: boolean
  }
  organisations: {
    enabled: boolean
  }
  mediaLibrary: {
    enabled: boolean
  }
  reports: {
    enabled: boolean
  }
  tags: {
    categories: {
      enabled: boolean
    }
    collections: {
      enabled: boolean
    }
  }
  users: {
    limit: boolean
    limit_count: number
  }
  primaryBrandColor: string
  secondaryBrandColor: string
}
interface TenantFormValues {
  id?: string
  name: string
  shortName: string
  url: string
  profileImage: string
  styles: {
    headings: {
      font: string
    }
    body: {
      font: string
    }
  }
  settings: TenantFeatureSettings
}

const TenantForm = ({tenant=null, onSubmit}) => {

  const defaultValues: TenantFormValues = {
    ...tenant,
    settings: {
      ...DEFAULT_TENANT_SETTINGS,
      ...tenant?.settings
    }
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

  const handleSubmit = async (data: any) => {
    await Promise.all([
      data.logo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_image: data.logo})),
      data.whiteLogo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_white_image: data.whiteLogo})),
      data.squareLogo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_square_image: data.squareLogo})),
      data.squareWhiteLogo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_square_white_image: data.squareWhiteLogo})),
      data.emailLogo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_for_emails_image: data.emailLogo})),
      data.certLogo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_for_certs_image: data.certLogo})),
      data.awardingBodyLogo instanceof File && (await uploadFilesAndNotify(endpoint, {logo_awarding_body_image: data.awardingBodyLogo}))
    ]).then(res => {
      console.log('data')
      console.log(data)
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
          required: 'Tenant name is required'
        })}
      />
      {errors.name && <span role="alert" className='text-red-500'>{errors.name.message}</span>}
      <TextInput
        label="Short name"
        placeholder="Short name"
        inputAttrs={register("shortName", { maxLength: 20 })}
      />
      {errors.name && errors.name.type === "required" && <span className='text-red-500'>Tenant short name is required</span>}
      {errors.name && errors.name.type === "maxLength" && <span className='text-red-500'>The tenant short name should be no longer than 20 characters</span> }
      <TextInput
        label="URL"
        placeholder="url"
        inputAttrs={register("url", {
          maxLength: {
            value: 50,
            message: 'Tenant url should be no longer than 50 characters',
          },
          required: 'Tenant url is required'
        })}
      />
      {errors.url && <span role="alert" className='text-red-500'>{errors.url.message}</span>}
      <ImageDropzoneInput
        label="Company logo"
        control={control}
        name="logo"
        initialValue={tenant?.logos.logo}
        />
      <ImageDropzoneInput
        label="Company logo (white)"
        control={control}
        name="whiteLogo"
        previewClassName="bg-black/40"
        initialValue={tenant?.logos.logo_white}
      />
      <ImageDropzoneInput
        label="Company logo (square)"
        control={control}
        name="squareLogo"
        initialValue={tenant?.logos.logo_square}
      />
      <ImageDropzoneInput
        label="Company logo (white, square)"
        control={control}
        name="squareWhiteLogo"
        previewClassName="bg-black/40"
        initialValue={tenant?.logos.logo_square_white}
      />
      <ImageDropzoneInput
        label="Logo for email headers (white)"
        control={control}
        name="emailLogo"
        previewClassName="bg-black/40"
        initialValue={tenant?.logos.logo_for_emails}
      />
      <ImageDropzoneInput
        label="Logo for certificates"
        control={control}
        name="certLogo"
        previewClassName="bg-black/40"
        initialValue={tenant?.logos.logo_for_certs}
      />
      <ImageDropzoneInput
        label="Awarding body logo"
        control={control}
        name="awardingBodyLogo"
        previewClassName="bg-black/40"
        initialValue={tenant?.logos.logo_awarding_body}
      />
      <TextInput
        label="Awarding body text"
        placeholder="Awarding body text"
        inputAttrs={register("settings.certificates.awardingBodyText")}
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

      <BoxContainer title={'Courses'} icon={contentTypes.course.icon} contentClassName="py-2 px-3 text-sm flex flex-col space-y-2">
        <CheckboxInput
          label="Enable course builder"
          inputAttrs={register("settings.courses.builder.enabled")}
        />
        <CheckboxInput
          label="Show 'Allow users to send course feedback' course setting"
          inputAttrs={register("settings.courses.showSendFeedbackButtonCourseSetting")}
        />
        <CheckboxInput
          label="Show 'Send feedback' button if course setting is set to 'on'"
          inputAttrs={register("settings.courses.showSendCourseFeedbackButton")}
        />
      </BoxContainer>


      <BoxContainer title={'Tags'} icon={contentTypes.course.icon} contentClassName="py-2 px-3 text-sm flex flex-col space-y-2">
      <CheckboxInput
          label="Enable 'categories'"
          inputAttrs={register("settings.tags.categories.enabled")}
        />
        <CheckboxInput
          label="Enable 'collections'"
          inputAttrs={register("settings.tags.collections.enabled")}
        />
      </BoxContainer>


      <BoxContainer title={'Resources'} icon={contentTypes.resource.icon} contentClassName="py-2 px-3 text-sm flex flex-col space-y-2">
        <CheckboxInput
          label="Enable resource library"
          inputAttrs={register("settings.resources.enabled")}
        />
        <CheckboxInput
          label="Enable resource reports"
          inputAttrs={register("settings.resources.reports.enabled")}
        />
      </BoxContainer>
      
      <BoxContainer title={'Pathways'} icon={contentTypes.pathway.icon} contentClassName="py-2 px-3 text-sm flex flex-col space-y-2">
        <CheckboxInput
          label="Enable pathways"
          inputAttrs={register("settings.pathways.enabled")}
        />
        <CheckboxInput
          label="Enable pathway reports"
          inputAttrs={register("settings.pathways.reports.enabled")}
        />
      </BoxContainer>

      <BoxContainer title={'Users'} icon={Users} contentClassName="py-2 px-3 text-sm flex flex-col space-y-2">
        <CheckboxInput
          label="Enable Users Limit"
          inputAttrs={register("settings.users.limit")}
        />

        {watch('settings.users.limit') && (
          <>
            <TextInput
              label={`User Limit ${tenant?.users?.totalCount ? '(min: ' + tenant.users.totalCount + ')' : ''}`}
              placeholder="User Limit"
              className="pb-2"
              type="number"
              inputAttrs={register("settings.users.limit_count", { 
                min: {
                  value: tenant?.users?.totalCount || 1,
                  message: `User limit cannot be less than ${tenant?.users?.totalCount || 1} because ${tenant?.users?.totalCount|| 1} users are already registered for this tenant.`,
                },
                required: "User limit is required",
              })}
            />
            {errors?.settings?.users?.limit_count && <span role="alert" className='text-red-500 pb-2'>{errors.settings.users.limit_count.message}</span>}
          </>
        )}
        
      </BoxContainer>

      <BoxContainer title={'Groups'} icon={Group2} contentClassName="py-2 px-3 text-sm flex flex-col space-y-2">
        <CheckboxInput
          label="Enable groups"
          inputAttrs={register("settings.groups.enabled")}
        />
      </BoxContainer>

      <BoxContainer title={'Organisations'} icon={PeopleTeamToolbox} contentClassName="py-2 px-3 text-sm flex flex-col space-y-2">
        <CheckboxInput
          label="Enable organisations"
          inputAttrs={register("settings.organisations.enabled")}
        />
      </BoxContainer>
      
      <Button type="submit">Submit</Button>
    </form>
  );
}

const DEFAULT_TENANT_SETTINGS: TenantFeatureSettings = {
  'courses': {
    'enabled': true,
    'showSendFeedbackButtonCourseSetting': false,
    'showSendCourseFeedbackButton': false,
    'reports': {
      'enabled': true
    },
    'builder': {
      'enabled': true
    }
  },
  'resources': {
    'enabled': true,
    'reports': {
      'enabled': false
    }
  },
  'pathways': {
    'enabled': false,
    'reports': {
      'enabled': false
    }
  },
  'groups': {
    'enabled': true
  },
  'organisations': {
    'enabled': false
  },
  'mediaLibrary': {
    'enabled': true
  },  
  'reports': {
    'enabled': true
  },
  'tags': {
    'categories': {
      'enabled': true
    },
    'collections': {
      'enabled': false
    }
  },
  'certificates': {
    'awardingBodyText': ''
  },
  'users': {
    'limit': false,
    'limit_count': 0
  },
  'primaryBrandColor': '#444444',
  'secondaryBrandColor': '#999999'
}

export default TenantForm
