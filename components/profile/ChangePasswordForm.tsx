import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import ImageDropzoneInput from '../common/inputs/ImageDropzoneInput';
import Button from '../Button';
import { useRouter } from 'next/router';
import useGetUser from '../../hooks/users/useGetUser';
import useUpdateUser from '../../hooks/users/useUpdateUser';
import useUpdateUserTenantRoles from '../../hooks/users/useUpdateUserTenantRoles';
import useUploadAndNotify from '../../hooks/useUploadAndNotify';

interface ChangePasswordFormValues {
  old_password: string
  password: string
  password_confirm: string
}

const ChangePasswordForm = () => {

  const router = useRouter()

  const onSubmit = (values) => {
    if(true) {
    }
    router.push('/profile')
  }
  
  const defaultValues = {
    old_password: '',
    password: '',
    password_confirm: ''
  }
  
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm<ChangePasswordFormValues>({
    defaultValues
  });

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Old password"
        placeholder="Old password"
        inputAttrs={register("old_password", {
          required:"Old password is required",
          maxLength: {
            value: 200,
            message:"Max length of the name is 200"
          }
        })}
      />
      <TextInput
        label="New password"
        placeholder="New password"
        inputAttrs={register("password", {
          required:"New password is required",
          maxLength: {
            value: 200,
            message:"Max length of the name is 200"
          }
        })}
      />
      <TextInput
        label="Confirm new password"
        placeholder="Confirm new password"
        inputAttrs={register("password_confirm", {
          required:"Confirm new password is required",
          maxLength: {
            value: 200,
            message:"Max length of the name is 200"
          }
        })}
      />
      {errors.password_confirm && (<small className="text-danger text-red-500">{errors.password_confirm.message}</small>)}

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default ChangePasswordForm