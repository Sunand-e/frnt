import TextInput from '../common/inputs/TextInput';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { useRouter } from 'next/router';
import useGetUser from '../../hooks/users/useGetUser';
import { useCallback } from 'react';

interface ChangePasswordFormValues {
  old_password: string
  password: string
  password_confirmation: string
}

const ChangePasswordForm = () => {

  const router = useRouter()

  const { user } = useGetUser()
  const id = user?.id
  const onSubmit = useCallback((values) => {
    if(id) {
      const data = {
        ...values
      }
      
      fetch(`/api/v1/user/${id}/reset_password`, {
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
            // setError('password', {
            //   type: "server",
            //   message: 'Username or password is incorrect',
            // });
          } else {
            // console.log('result')
            // console.log(result)
            router.push('/profile')
            // setError(result.error)
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log('ERROR:')
          console.log(error)
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
        }
      )
    }
    // console.log(data);
    // console.log("log:" + " " + JSON.stringify(data))
  },[user])
    
  const defaultValues = {
    old_password: '',
    password: '',
    password_confirmation: ''
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

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default ChangePasswordForm