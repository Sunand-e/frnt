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
import ImageDropzoneInput from "../../common/inputs/ImageDropzoneInput";
import useUploadAndNotify from "../../../hooks/useUploadAndNotify";

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
  const endpoint = "/api/v1/user/update"
  const method = "PUT"

  const { uploadFileAndNotify } = useUploadAndNotify({
    additionalParams: { user_id: user?.id },
    endpoint,
    method,
  })

  const { register, handleSubmit: rhfHandleSubmit, control, formState: { errors }, watch } = useForm<UserFormValues>({
    defaultValues
  });
  const formValues = watch();

  const handleSubmit = async (data) => {
    await Promise.all([
      data.profileImage instanceof File && await uploadFileAndNotify(data.logo, 'profileImage')
    ]).then(res => {
        onSubmit(data)
      }
    )
  }

  const { closeModal } = useContext(ModalContext)
  console.log("errors", errors);
  
  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={rhfHandleSubmit(handleSubmit)}
    >
      <TextInput
        label="First name"
        placeholder="First name"
        inputAttrs={register("first_name", {
          required:"First name is required",
          maxLength: {
            value: 20,
            message:"Max length of the name is 20"
          }
        })}
      />
      {errors.first_name && (<small className="text-danger text-red-500">{errors.first_name.message}</small>)}
      <TextInput
        label="Last name"
        placeholder="Last name"
        inputAttrs={register("last_name",
  {
          required:"Last is required",
          maxLength: {
            value: 20,
            message:"Max length of the name is 20"
          }
        }
        )}
      />
      {errors.last_name && (<small className="text-danger text-red-500">{errors.last_name.message}</small>)}
      <TextInput
        label="Email"
        placeholder="email"
        inputAttrs={register("email", {
          required:"Email is required",
          maxLength: {
            value: 40,
            message:"Max length of the name is 40"
          },
          pattern:{
            value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
            message: "Please give valid email"
          }
        })}
      />
      {errors.email && (<small className="text-danger text-red-500">{errors.email.message}</small>)}
      {/*<ImageSelectInput*/}
      {/*  placeholder={'https://picsum.photos/640/360'}*/}
      {/*  buttonText="Choose profile image"*/}
      {/*  control={control}*/}
      {/*  name="profileImage"*/}
      {/*  onSelect={() =>closeModal() }*/}
      {/*  // inputAttrs={register("image", { required: true })}*/}
      {/*/>*/}
      <ImageDropzoneInput
        buttonText="Choose tenant logo"
        label="Company logo"
        control={control}
        name="logo"
        initialValue={user?.profileImage}
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

      <pre>
        {JSON.stringify(formValues, null, 2)}
      </pre>
    </form>
  );
}

export default UserForm
