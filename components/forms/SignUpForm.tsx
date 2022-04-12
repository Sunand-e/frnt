import { useForm } from "react-hook-form";
import { useRouter } from "../../utils/router";
import TextInput from "../TextInput";

const SignUpForm = () => {

  const router = useRouter()
  const { token } = router.query

  const SIGN_UP_ENDPOINT = '/api/v1/users'

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const login = async (data) => {
    
    const formData = {
      ...data,
      invitation_token: token
    }
    console.log('fetch........')
    console.log('formData')
    console.log(formData)
    await fetch(SIGN_UP_ENDPOINT, {
      method: 'POST', // or 'PUT'
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
      <TextInput
        label="First name"
        placeholder="First name"
        inputAttrs={register("first_name", { maxLength: 20 })}
      />
      <TextInput
        label="Last name"
        placeholder="Last name"
        inputAttrs={register("last_name", { maxLength: 20 })}
      />
      <TextInput
        label="email"
        placeholder="email"
        inputAttrs={register("email", { maxLength: 40 })}
      />
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

export default SignUpForm