import Button from '../common/Button';
import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import CheckboxInput from '../common/inputs/CheckboxInput';
import UserRoleSelect from './inputs/UserRoleSelect';
import ImageDropzoneInput from "../common/inputs/ImageDropzoneInput";
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import GroupSelect from '../groups/inputs/GroupSelect';
import GroupSelectInput from '../groups/inputs/GroupSelectInput';

interface UserFormValues {
  id?: string
  firstName: string
  lastName: string
  email: string
  profileImage: string
  group_id: string
  role_ids: [string]
  invite: boolean
}

const UserForm = ({user=null, onSubmit}) => {
  
  const { userHasCapability, determineCapabilityScope } = useUserHasCapability()
  
  
  const addUsersToGroupsCapabilityScope = determineCapabilityScope('AddUsersToGroups')

  const defaultValues = {
    // capabilityIds: role?.capabilities.map(capability => capability.id),
    ...user,
    firstName: user?.firstName,
    lastName: user?.lastName,
    group_id: null,
    role_ids: user?.roles.map(role => role.id),
  }
  
  const { register, handleSubmit: rhfHandleSubmit, control, formState: { errors }, watch } = useForm<UserFormValues>({
    defaultValues
  });

    
  let showAddUsersToGroupsInput = false
  if(addUsersToGroupsCapabilityScope.tenant === true || addUsersToGroupsCapabilityScope.groups.length > 1) {
    showAddUsersToGroupsInput = true
  }
  
  let group_id = null
  if(addUsersToGroupsCapabilityScope.tenant === false && addUsersToGroupsCapabilityScope.groups.length === 1) {
    group_id = addUsersToGroupsCapabilityScope.groups[0]
  }

  const handleSubmit = (data) => {
    data.group_id = data.group_id || group_id
    onSubmit(data)
  }

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      autoComplete="off"
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
        inputAttrs={register("lastName", {
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
            message:"Max length of the email address is 160"
          },
          pattern:{
            value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/i,
            message: "Please enter a valid email address"
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
      { userHasCapability('UpdateUserTenantRoles') && (
        <UserRoleSelect
          control={control}
          roleType='tenant_role'
          className='z-50'
        />
      )}
      { !user && showAddUsersToGroupsInput && (
        <GroupSelectInput
          label="Add user to group/organisation"
          name='group_id'
          control={control}
        />
      )}
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
