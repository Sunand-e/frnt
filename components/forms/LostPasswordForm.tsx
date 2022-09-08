import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "../../utils/router";
import Button from "../Button";
import TextInput from "../common/inputs/TextInput";

const LostPasswordForm = () => {

  const router = useRouter()
  const { token } = router.query
  const REQUEST_PASSWORD_RESET_ENDPOINT = '/api/v1/user/request_password_reset'

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm();
  const email = useWatch({
    control,
    name: "email",
  });

  const [submitted, setSubmitted] = useState(false)
  const tryAgain = () => {
    reset();
    setSubmitted(false)
  }


  const requestPasswordReset = async (data) => {
    
    const formData = {
      ...data,
      invitation_token: token
    }
    console.log('fetch........')
    console.log('formData')
    console.log(formData)
    await fetch(REQUEST_PASSWORD_RESET_ENDPOINT, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(
      (result) => {
        setSubmitted(true)
        console.log('result........')
        console.log(result)
      }
    )
  }

  const onSubmit = async data => {
    await requestPasswordReset(data);
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center pt-8`}>
      { submitted ? (
        <>
          <p className="text-main text-xl mb-4">Check your emails</p>
          
          <p className="mb-4">
            If the email address <span className="font-bold"> {email}</span> exists in our database, we will send you a
            password reset link, where you can set a new password for your account.
          </p>
          <p>Didn't receive an email? <button className="text-main" onClick={tryAgain}>Try again</button></p>
        </>
      ) : (
        <>
          <p className="text-main text-xl mb-4">Forgotten your password?</p>
          <p className="mb-4">
            Don't worry &mdash; enter your email address below, and if you have an account with us, we'll send you a link
            where you can set a new password.
          </p>
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className={`h-full w-full max-w-sm flex flex-col space-y-4`}
          >
            <TextInput
              label="Email address"
              placeholder="me@mycompany.com"
              inputAttrs={register("email", { maxLength: 40 })}
            />
            {errors.password && <span role="alert">{errors.password.message}</span>}
            <Button type="submit">SUBMIT</Button>
          </form>
        </>
      )}

    </div>
  );
}

export default LostPasswordForm