import Button from '../common/Button';
import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import CheckboxInput from '../common/inputs/CheckboxInput';
import UserRoleSelect from './inputs/UserRoleSelect';
import ImageDropzoneInput from "../common/inputs/ImageDropzoneInput";

interface UserFormValues {
  id?: string
  firstName: string
  lastName: string
  email: string
  profileImage: string
  role_ids: [string]
  invite: boolean
}

const UserForm = ({user=null, onSubmit}) => {
  console.log('user?.roles.map(role => role.id)')
  console.log(user?.roles.map(role => role.id))
  const defaultValues = {
    // capabilityIds: role?.capabilities.map(capability => capability.id),
    ...user,
    firstName: user?.firstName,
    lastName: user?.lastName,
    // anotherattr: 123,
    role_ids: user?.roles.map(role => role.id),
  }
  
  const { register, handleSubmit: rhfHandleSubmit, control, formState: { errors }, watch } = useForm<UserFormValues>({
    defaultValues
  });

  const handleSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={rhfHandleSubmit(handleSubmit)}
    >
      <TextInput
        label="First name"
        placeholder="First name"
        inputAttrs={register("firstName", {
          required:"First name is required",
          maxLength: {
            value: 20,
            message:"Max length of the name is 20"
          }
        })}
      />
      {errors.firstName && (<small className="text-danger text-red-500">{errors.firstName.message}</small>)}
      <TextInput
        label="Last name"
        placeholder="Last name"
        inputAttrs={register("lastName",
  {
          required:"Last is required",
          maxLength: {
            value: 20,
            message:"Max length of the name is 20"
          }
        }
        )}
      />
      {errors.lastName && (<small className="text-danger text-red-500">{errors.lastName.message}</small>)}
      <TextInput
        label="Email"
        placeholder="email"
        inputAttrs={register("email", {
          required:"Email is required",
          maxLength: {
            value: 160,
            message:"Max length of the name is 40"
          },
          pattern:{
            value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/i,
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
        buttonText="Choose profile image"
        label="Profile image"
        control={control}
        name="profile_image"
        initialValue={user?.profileImageUrl}
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
      { !user ? (
        <CheckboxInput
          label="Send user an invitation upon creation"
          inputAttrs={register("invite")}
        />
      ) : (
        <CheckboxInput
          label="Send the user an invitation email"
          inputAttrs={register("invite")}
        />
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default UserForm
