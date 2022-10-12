import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import ImageDropzoneInput from '../common/inputs/ImageDropzoneInput';
import Button from '../common/Button';
import { useRouter } from 'next/router';
import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import useUpdateUser from '../../hooks/users/useUpdateUser';
import useUploadAndNotify from '../../hooks/useUploadAndNotify';
import { useEffect } from 'react';

interface ProfileFormValues {
  id?: string
  first_name: string
  last_name: string
  email: string
  profile_image: string
  roleIds: [string]
  invite: boolean
}


const ProfileForm = () => {

  const router = useRouter()
  const { user, loading, error } = useGetCurrentUser()

  const { updateUser } = useUpdateUser()
  const { uploadFileAndNotify } = useUploadAndNotify({
    method: "PUT"
  })

  const onSubmit = ({profile_image, ...values}) => {
    updateUser(values)
    if(profile_image) {
      const imageEndpoint = `/api/v1/users/${user.id}/update_profile_image`
      profile_image instanceof File && uploadFileAndNotify(profile_image, 'profile_image', imageEndpoint)
    }
    router.push('/')
  }
  

  const defaultValues = {
    // capabilityIds: role?.capabilities.map(capability => capability.id),
    ...user,
    first_name: user?.firstName,
    last_name: user?.lastName,
    // anotherattr: 123,
    role_ids: user?.roles.map(role => role.id),
  }
  
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<ProfileFormValues>({
    defaultValues
  });

  useEffect(() => {
    reset(defaultValues);
  }, [user]);

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
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
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default ProfileForm
