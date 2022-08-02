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


  const { watch, register, handleSubmit,formState: { errors }, control } = useForm<TenantFormValues>({
    defaultValues
  });

  const big = watch()
  const { closeModal } = useContext(ModalContext)

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      // onSubmit={handleSubmit(onSubmit)}
      onSubmit={handleSubmit((data) => {
        console.log('data');
        console.log(data);
      })}
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
        // placeholder={'https://picsum.photos/640/360'}
        buttonText="Choose tenant image"
        control={control}
        name="tenantImage"
        onSelect={closeModal}
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
      {/*<SelectInput*/}
      {/*  label="User role"*/}
      {/*  options={["Employee", "External", "Manager"]}*/}
      {/*  inputAttrs={register("name")}*/}
      {/*/>*/}
      {/*<UserRoleSelect*/}
      {/*  control={control}*/}
      {/*  roleType='tenant_role'*/}
      {/*/>*/}
      {/*<CheckboxInput*/}
      {/*  label="Send tenant an invitation upon creation"*/}
      {/*  inputAttrs={register("invite")}*/}
      {/*/>*/}
      <Button type="submit">Submit</Button>
      <pre>
      { JSON.stringify(big,null,2) }
      </pre>
    </form>
  );
}

export default TenantForm
