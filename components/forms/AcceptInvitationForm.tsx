import { useForm } from "react-hook-form";
import { useRouter } from "../../utils/router";

const AcceptInvitationForm = () => {

  const router = useRouter()
  const { token } = router.query

  const ACCEPT_INVITE_ENDPOINT = '/api/v1/users/invitation/accept'

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const login = async (data) => {
    
    const formData = {
      ...data,
      invitation_token: token
    }
    console.log('fetch........')
    console.log('formData')
    console.log(formData)
    await fetch(ACCEPT_INVITE_ENDPOINT, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log('result........')
        console.log(result)
      }
    )
  }


  const onSubmit = async data => {
    await login(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col`}>
      <label htmlFor="password">password</label>
      <input
        id="password"
        {...register("password", {
          required: "required",
          minLength: {
            value: 5,
            message: "min length is 5"
          }
        })}
        type="password"
      />
        <label htmlFor="password_confirmation">confirm password</label>
      <input
        id="password_confirmation"
        {...register("password_confirmation", {
          required: "required",
          minLength: {
            value: 5,
            message: "min length is 5"
          }
        })}
        type="password"
      />
      {errors.password && <span role="alert">{errors.password.message}</span>}
      <button type="submit">SUBMIT</button>
    </form>
  );
}

export default AcceptInvitationForm