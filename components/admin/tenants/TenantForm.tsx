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

interface TenantFormValues {
  id?: string
  name: string
  shortName: string
  url: string
  profileImage: string
}

const TenantForm = ({tenant=null, onSubmit}) => {

  const defaultValues = {
    // capabilityIds: role?.capabilities.map(capability => capability.id),
    ...tenant,
    name: tenant?.name,
    url: tenant?.url,
    // anotherattr: 123,
    // role_ids: tenant?.roles.map(role => role.id),
  }

  const { register, handleSubmit,formState: { errors }, control } = useForm<TenantFormValues>({
    defaultValues
  });

  const { closeModal } = useContext(ModalContext)

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
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
      <ImageSelectInput
        placeholder={'https://picsum.photos/640/360'}
        buttonText="Choose tenant image"
        control={control}
        name="tenantImage"
        onSelect={closeModal}
        // inputAttrs={register("image", { required: true })}
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
    </form>
  );
}

export default TenantForm
