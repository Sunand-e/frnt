import React, { useContext } from 'react';
import Button from '../../Button';
import ImageSelectInput from '../../common/inputs/ImageSelectInput';
import SelectInput from '../../common/inputs/SelectInput';
import TextInput from '../../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import CheckboxInput from '../../common/inputs/CheckboxInput';
import UserRoleSelect from './inputs/UserRoleSelect';
import Link from 'next/link';
import { ModalContext } from '../../../context/modalContext';

interface UserFormValues {
  id?: string
  first_name: string
  last_name: string
  email: string
  profileImage: string
  roleIds: [string]
  invite: boolean
}

const UserForm = ({user=null, onSubmit}) => {

  const defaultValues = {
    // capabilityIds: role?.capabilities.map(capability => capability.id),
    ...user,
    first_name: user?.firstName,
    last_name: user?.lastName,
    // anotherattr: 123,
    role_ids: user?.roles.map(role => role.id),
  }

  const { register, handleSubmit, control } = useForm<UserFormValues>({
    defaultValues
  });

  const { closeModal } = useContext(ModalContext)

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="First name"
        placeholder="First name"
        inputAttrs={register("first_name", { maxLength: 20 })}
      />
      <TextInput
        label="Last name"
        placeholder="Last name"
        inputAttrs={register("last_name", { maxLength: 20 })}
      />
      <TextInput
        label="Email"
        placeholder="email"
        inputAttrs={register("email", { maxLength: 40 })}
      />
      <ImageSelectInput
        placeholder={'https://picsum.photos/640/360'}
        buttonText="Choose profile image"
        control={control}
        name="profileImage"
        onSelect={closeModal()}
        // inputAttrs={register("image", { required: true })}
      />
      {/* <SelectInput
        label="User role"
        options={["Employee", "External", "Manager"]}
        inputAttrs={register("userRole")}
      /> */}
      <UserRoleSelect
        control={control}
        roleType='tenant_role'
      />
      <CheckboxInput
        label="Send user an invitation upon creation"
        inputAttrs={register("invite")}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default UserForm