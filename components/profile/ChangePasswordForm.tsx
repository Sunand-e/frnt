import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface ChangePasswordFormValues {
  old_password: string
  password: string
  password_confirmation: string
}

const ChangePasswordForm = () => {

  const router = useRouter()

  const defaultValues = {
    old_password: '',
    password: '',
    password_confirmation: ''
  }
  
  const { register, handleSubmit, setError, formState: { errors }, watch } = useForm<ChangePasswordFormValues>({
    defaultValues
  });

  const onSubmit = useCallback((values: any) => {
    const data = {
      ...values
    }
    
    fetch(`/api/v1/user/reset_password`, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.error) {
          setError('password', {
            type: "server",
            message: result.error,
          });
        } else {
          router.push('/profile/')
        }
      },
    )
  }, [])

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
      >
      <TextInput
        type="password"
        label="Old password"
        inputAttrs={register("old_password", {
          required:"Old password is required",
          maxLength: {
            value: 200,
            message:"Max length of the name is 200"
          }
        })}
      />
      <TextInput
        type="password"
        label="New password"
        placeholder=""
        inputAttrs={register("password", {
          required:"New password is required",
          maxLength: {
            value: 200,
            message:"Max length of the name is 200"
          }
        })}
      />
      <TextInput
        type="password"
        label="Confirm new password"
        placeholder=""
        inputAttrs={register("password_confirmation", {
          required:"Confirm new password is required",
          maxLength: {
            value: 200,
            message:"Max length of the name is 200"
          },
          validate: (val: string) => {
            if (watch('password') != val) {
              return "Your passwords do no match";
            }
          },
        })}
      />
      {errors.password_confirmation && (<small className="text-danger text-red-500">{errors.password_confirmation.message}</small>)}
      {errors.password && (<small className="text-danger text-red-500">{errors.password.message}</small>)}

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default ChangePasswordForm