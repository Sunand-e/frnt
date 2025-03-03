import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

interface PasswordFormValues {
  password: string
}

const PasswordVerificationForm = ({ onSuccess = () => {} }) => {

  const router = useRouter()
  const onSubmit = useCallback((values: any) => {
    const data = {
      ...values
    }
    
    fetch(`/api/v1/user/verify_password`, {
      method: 'PUT',
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
          onSuccess()
          toast(result.message, {
            toastId: 'verifyPassword',
            hideProgressBar: false,
            autoClose: 2500
          })  
        }
      },
    )
  }, [onSuccess])
  
  const { register, handleSubmit, setError, formState: { errors }, } = useForm<PasswordFormValues>({
    defaultValues: {
      password: ''
    }
  });

  return (
    <form
      className='h-full w-full max-w-sm flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
      >
      <TextInput
        type="password"
        label="To continue, first verify that it's you"
        placeholder='Password'
        inputAttrs={register("password", {
          required:"password is required",
          maxLength: {
            value: 200,
            message:"Max length of the name is 200"
          }
        })}
      />
      {errors.password && (<small className="text-danger text-red-500">{errors.password.message}</small>)}

      <Button type="submit">Next</Button>
    </form>
  );
}

export default PasswordVerificationForm
