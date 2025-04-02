import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "../../utils/router";
import Button from "../common/Button";
import TextInput from "../common/inputs/TextInput";

interface PasswordResetFormValues {
  password: string
  password_confirmation: string
}

const ResetPasswordForm = () => {

  const router = useRouter()
  const { token } = router.query
  const RESET_PASSWORD_ENDPOINT = '/api/v1/user/update_password'

  const { register, control, handleSubmit, formState: { errors }, reset, watch } = useForm<PasswordResetFormValues>();

  const resetPassword = async (data: any) => {
    
    const formData = {
      ...data,
      reset_password_token: token
    }
    await fetch(RESET_PASSWORD_ENDPOINT, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(res => {
      return res.json()
    })
    .then(
      (result) => {
        router.push('/')
      }
    )
  }

  const onSubmit = async (data: any) => {
    await resetPassword(data);
    reset();
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center pt-8`}>
      <p className="text-main text-xl mb-4">Enter your new password:</p>
      <form
        onSubmit={handleSubmit(onSubmit)} 
        className='h-full w-full max-w-sm flex flex-col space-y-4'
      >
        <TextInput
          type="password"
          label="New password"
          placeholder=""
          inputAttrs={register("password", {
            required: true,
            minLength: {
              value: 5,
              message: "Min length is 5"
            },
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
            required: true,
            validate: (val: string) => {
              if (watch('password') != val) {
                return "Your passwords do no match";
              }
            },
          })}
        />
        {errors.password?.message && <span role="alert" className="text-red-500">{errors.password.message}</span>}
        {errors.password_confirmation?.message && <span role="alert" className="text-red-500">{errors.password_confirmation.message}</span>}
        <Button type="submit">SUBMIT</Button>
      </form>
    </div>
  )
}

export default ResetPasswordForm