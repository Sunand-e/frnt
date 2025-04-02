import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../../graphql/cache";
import { useRouter } from "../../utils/router";
import Button from "../common/Button";
import TextInput from "../common/inputs/TextInput";

interface AcceptInvitationFormValues {
  password: string
  password_confirmation: string
}

const AcceptInvitationForm = () => {

  const router = useRouter()
  const { token } = router.query

  const ACCEPT_INVITE_ENDPOINT = '/api/v1/users/invitation/accept'

  const { watch, register, handleSubmit, formState: { errors }, reset } = useForm<AcceptInvitationFormValues>();

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
    <form onSubmit={handleSubmit(onSubmit)} className='h-full w-full max-w-sm flex flex-col space-y-4'>
      <TextInput
        label="Password"
        type="password"
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
        label="Confirm password"
        type="password"
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
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default AcceptInvitationForm;
