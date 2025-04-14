import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import ImageDropzoneInput from '../common/inputs/ImageDropzoneInput';
import Button from '../common/Button';
import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import useUpdateUser from '../../hooks/users/useUpdateUser';
import useUploadAndNotify from '../../hooks/useUploadAndNotify';
import { useEffect, useMemo } from 'react';
import PhoneNumberInput from './PhoneNumberInput';

interface ProfileFormValues {
  id?: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  profile_image: string
  roleIds: [string]
  invite: boolean
  otpVerifiedToken: string
}

const ProfileForm = () => {
  const { user } = useGetCurrentUser()

  const { updateUser, loading, error } = useUpdateUser()
  const { uploadFilesAndNotify } = useUploadAndNotify({
    method: "PUT"
  })

  const onSubmit = ({ profile_image, ...values }) => {
    updateUser({
      ...values,
      update_self: true
    })
    if (profile_image) {
      const imageEndpoint = `/api/v1/users/${user.id}/update_profile_image`
      profile_image instanceof File && uploadFilesAndNotify(imageEndpoint, { profile_image })
    }
  }

  const defaultValues = {
    ...user,
    email: user?.unconfirmedEmail || user?.email,
    otpVerifiedToken: null,
    role_ids: user?.roles.map((role: any) => role.id),
  }

  const { register, handleSubmit, setValue, control, formState: { errors }, reset, watch } = useForm<ProfileFormValues>({
    defaultValues
  });

  const isValid = useMemo(() => {
    return user?.phoneNumber == watch('phoneNumber') || watch('otpVerifiedToken') != null || !watch('phoneNumber')
  }, [user, watch('phoneNumber'), watch('otpVerifiedToken')])

  useEffect(() => {
    reset(defaultValues);
  }, [user]);

  return (
    <form
      className='h-full w-full max-w-md flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="First name"
        placeholder="First name"
        inputAttrs={register("firstName", {
          required: "First name is required",
          maxLength: { value: 20, message: "Max length of the name is 20" }
        })}
      />
      {errors.firstName && (<small className="text-danger text-red-500">{errors.firstName.message}</small>)}

      <TextInput
        label="Last name"
        placeholder="Last name"
        inputAttrs={register("lastName", {
          required: "Last is required",
          maxLength: { value: 20, message: "Max length of the name is 20" }
        })}
      />
      {errors.lastName && (<small className="text-danger text-red-500">{errors.lastName.message}</small>)}

      <TextInput
        label="Email"
        placeholder="email"
        inputAttrs={{
          ...register("email", {
            required: "Email is required",
            maxLength: { value: 40, message: "Max length of the name is 40" },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Please provide a valid email"
            }
          }),
          readOnly: true
        }}
      />
      {errors.email && (<small className="text-danger text-red-500">{errors.email.message}</small>)}

      <PhoneNumberInput register={register} setValue={setValue} watch={watch} />

      <ImageDropzoneInput
        label="Profile image"
        control={control}
        name="profile_image"
        initialValue={user?.profileImageUrl}
      />

      <Button disabled={!isValid || loading} type="submit">
        {loading ? "Submitting" : "Submit"}
      </Button>

      {error && <div className="text-red-500">{error.message}</div>}
    </form>
  );
}

export default ProfileForm;
