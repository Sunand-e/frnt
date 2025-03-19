import Button from '../common/Button';
import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import CheckboxInput from '../common/inputs/CheckboxInput';
import UserRoleSelect from './inputs/UserRoleSelect';
import ImageDropzoneInput from "../common/inputs/ImageDropzoneInput";
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import GroupSelectInput from '../groups/inputs/GroupSelectInput';
import { UserLimit } from './UserLimit';
import useGetCurrentTenant from '../../hooks/tenants/useGetCurrentTenant';

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

const UserForm = ({ user = null, onSubmit }) => {
  const { userHasCapability, determineCapabilityScope } = useUserHasCapability()
  const addUsersToGroupsCapabilityScope = determineCapabilityScope('AddUsersToGroups')
  const { tenant } = useGetCurrentTenant()

  const defaultValues = {
    ...user,
    firstName: user?.firstName,
    lastName: user?.lastName,
    group_id: null,
    role_ids: user?.roles.map((role: any) => role.id),
  }

  const { register, handleSubmit: rhfHandleSubmit, control, formState: { errors }, watch } = useForm<UserFormValues>({
    defaultValues
  });

  let showAddUsersToGroupsInput = false
  if (addUsersToGroupsCapabilityScope.tenant === true || addUsersToGroupsCapabilityScope.groups.length > 1) {
    showAddUsersToGroupsInput = true
  }

  let group_id = null
  if (addUsersToGroupsCapabilityScope.tenant === false && addUsersToGroupsCapabilityScope.groups.length === 1) {
    group_id = addUsersToGroupsCapabilityScope.groups[0]
  }

  const handleSubmit = (data: any) => {
    data.group_id = data.group_id || group_id
    onSubmit(data)
  }

  return (
    <>
      <UserLimit tenant={tenant} />
      <form
        className='h-full w-full max-w-sm flex flex-col space-y-4'
        autoComplete="off"
        onSubmit={rhfHandleSubmit(handleSubmit)}
      >
        <TextInput
          label="First name"
          placeholder="First name"
          inputAttrs={register("firstName", {
            required: "First name is required",
            maxLength: { value: 20, message: "Max length of the name is 20" }
          })}
        />
        {errors.firstName && <small className="text-danger text-red-500">{errors.firstName.message}</small>}

        <TextInput
          label="Last name"
          placeholder="Last name"
          inputAttrs={register("lastName", {
            required: "Last name is required",
            maxLength: { value: 20, message: "Max length of the name is 20" }
          })}
        />
        {errors.lastName && <small className="text-danger text-red-500">{errors.lastName.message}</small>}

        <TextInput
          label="Email"
          placeholder="email"
          inputAttrs={register("email", {
            required: "Email is required",
            maxLength: { value: 160, message: "Max length of the email address is 160" },
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~\-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~\-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,24}$/,
              message: "Please enter a valid email address"
            }
          })}
        />
        {errors.email && <small className="text-danger text-red-500">{errors.email.message}</small>}

        <ImageDropzoneInput label="Profile image" control={control} name="profile_image" initialValue={user?.profileImageUrl} />

        {userHasCapability('UpdateUserTenantRoles') && (
          <UserRoleSelect control={control} roleType="tenant_role" className="z-50" />
        )}

        {!user && showAddUsersToGroupsInput && (
          <GroupSelectInput
            label="Add user to group/organisation"
            name="group_id"
            isClearable={addUsersToGroupsCapabilityScope.tenant === true}
            control={control}
          />
        )}

        {!user ? (
          <CheckboxInput label="Send user an invitation upon creation" inputAttrs={register("invite")} />
        ) : (
          <CheckboxInput label="Send the user an invitation email" inputAttrs={register("invite")} />
        )}

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default UserForm
