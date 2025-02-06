import { useRouter } from 'next/router';
import { isLoggedInVar } from '../../../graphql/cache';
import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import TextInput from "../../common/inputs/TextInput";
import Link from 'next/link';

const ENDPOINT_SIGNIN = '/api/v1/user/sign_in'

interface UserLoginFormValues{
    email: string;
    password: string;
    'remember-me': boolean;
}

const LoginForm = () => {

  // const [error, setError] = useState(null)
const router = useRouter()

const { setError, register, handleSubmit, control, formState: { errors } } = useForm<UserLoginFormValues>({      });

  const onSubmit = values => {
    const data = {
      remember_me: "0",
      ...values
    }

    fetch(ENDPOINT_SIGNIN, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.status) {
          isLoggedInVar(true);
          router.push('/');
        } else if(result.error) {
          setError('password', {
            type: "server",
            message: 'Username or password is incorrect',
          });
          // setError(result.error)
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        // this.setState({
        //   isLoaded: true,
        //   error
        // });
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email address"
        placeholder="Email address"
        inputAttrs={register("email", {
          required:"Email is required",
          maxLength: {
            value: 160,
            message:"Max length of the email address is 160 characters"
          },
          pattern:{
            value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/i,
            message: "Please give valid email"
          }
        })}
      />
      {errors.email && (<small className="text-danger text-red-600">{errors.email.message}</small>)}
      <TextInput
        label="Password"
        placeholder="Password"
        type="password"
        className="mt-4"
        inputAttrs={register("password", {
            required:"Password is required"
        })}
      />
      {errors.password && (<small className="text-danger text-red-500">{errors.password.message}</small>)}
      <div className="flex flex-col items-start justify-between my-4">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 text-main focus:ring-main border-gray-300 rounded"
            {...register("remember-me")}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

      </div>
      
      <button
        className="w-full flex justify-center py-2 px-4 mb-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:bg-main-dark-05 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign In
      </button>

      <div className="text-sm">
          <Link href="/lost-password" className="font-medium text-main hover:opacity-70">
          
            Forgot your password?
          
          </Link>
        </div>
    </form>
  );
}

export default LoginForm
