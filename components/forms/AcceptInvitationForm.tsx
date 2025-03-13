import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../../graphql/cache";
import { useRouter } from "../../utils/router";
import Button from "../common/Button";
import TextInput from "../common/inputs/TextInput";

const AcceptInvitationForm = () => {

  const router = useRouter()
  const { token } = router.query

  const ACCEPT_INVITE_ENDPOINT = '/api/v1/users/invitation/accept'

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const login = async (data: any) => {
    
    const formData = {
      ...data,
      invitation_token: token
    }
    await fetch(ACCEPT_INVITE_ENDPOINT, {
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
        if(result.status === 'Invitation accepted!') {
          isLoggedInVar(true);
          router.push('/');
        }
      }
    )
  }

  const onSubmit = async (data: any) => {
    await login(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={``}>
      <TextInput
        label="Password"
        type="password"
        className="mb-4"
        inputAttrs={register("password", {
          required: "required", 
          minLength: {
            value: 5,
            message: "min length is 5"
          }
        })}
      />
      <TextInput
        label="Confirm password"
        type="password"
        className="mb-4"
        inputAttrs={register("password_confirmation", {
          required: "required",
          minLength: {
            value: 5,
            message: "min length is 5"
          }
        })}
      />
      
      {errors.password && <span role="alert">{errors.password.message}</span>}
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default AcceptInvitationForm