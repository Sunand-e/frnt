import { useForm } from "react-hook-form";
import { useRouter } from "../../utils/router";
import TextInput from "../common/inputs/TextInput";

const SignUpForm = () => {

  const router = useRouter()
  const { token } = router.query

  const SIGN_UP_ENDPOINT = '/api/v1/users/public_sign_up'

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const login = async (data) => {
    
    const formData = {
      ...data,
      invitation_token: token
    }

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

      }
    )
  }


  const onSubmit = async data => {
    await login(data);
    reset();
  };

  return (
    <form 
    onSubmit={handleSubmit(onSubmit)} 
    className={`h-full w-full max-w-sm flex flex-col space-y-4`}
    >
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
      <label htmlFor="password">password
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
      </label>
      <label htmlFor="password_confirmation">confirm password
      
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
        </label>
      {errors.password && <span role="alert">{errors.password.message}</span>}
      <button type="submit">SUBMIT</button>
    </form>
  );
}

export default SignUpForm