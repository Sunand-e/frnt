import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "../../utils/router";
import Button from "../Button";
import TextInput from "../common/inputs/TextInput";

const ResetPasswordForm = () => {

  const router = useRouter()
  const { token } = router.query
  const RESET_PASSWORD_ENDPOINT = '/api/v1/user/update_password'

  const { register, control, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const resetPassword = async (data) => {
    
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
        // if(result.status === 'Invitation Accepted!') {
        // }
      }
    )
  }

  const onSubmit = async data => {
    await resetPassword(data);
    reset();
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center pt-8`}>
      <p className="text-main text-xl mb-4">Enter your new password:</p>
      {/* <p className="mb-4">
        Don't worry &mdash; enter your email address below, and if you have an account with us, we'll send you a link
        where you can set a new password.
      </p> */}
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className={`h-full w-full max-w-sm flex flex-col space-y-4`}
      >
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
      {errors.password_confirm && (<small className="text-danger text-red-500">{errors.password_confirm.message}</small>)}
        <Button type="submit">SUBMIT</Button>
      </form>
    </div>
  )
}

export default ResetPasswordForm