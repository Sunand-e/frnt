import Router from 'next/router';
import { Form, Formik } from 'formik';
import { isLoggedInVar } from '../graphql/cache';
import React, { useContext } from "react";
import { useForm } from 'react-hook-form';
import TextInput from "./common/inputs/TextInput";

const ENDPOINT_SIGNIN = '/auth/users/sign_in'

interface UserLoginFormValues{
    email: string;
    password: string;
    'remember-me': boolean;
}

const LoginForm = () => {

  // const isLoggedIn = useReactiveVar(isLoggedInVar);
    const { register, handleSubmit, control, formState: { errors } } = useForm<UserLoginFormValues>({      });
   // const onSubmit=(data) => console.log(data);
  const onSubmit = values => {
    const data = {
      user: {
        // remember_me: "1",
        remember_me: "0",
        ...values
      }
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
        if(result.token) {
          localStorage.setItem('token', result.token as string);
          isLoggedInVar(true);
          Router.push('/');
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
      console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
            label="Email address"
            placeholder="Email address"
            inputAttrs={register("email", {
                required:"Email is required",
                maxLength: {
                    value: 40,
                    message:"Max length of the name is 40"
                },
                pattern:{
                    value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                    message: "Please give valid email"
                }
            })}
        />
        {errors.email && (<small className="text-danger text-red-500">{errors.email.message}</small>)}
        <TextInput
            label="Password"
            placeholder="Password"
            type="password"
            className="mt-6"
            inputAttrs={register("password", {
                required:"Password is required"
            })}
        />
        <div className="flex items-center justify-between my-6">
                   <div className="flex items-center">
                       <input
                         id="remember-me"
                         type="checkbox"
                         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                         {...register("remember-me")}
                       />
                       <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                         Remember me
                       </label>
                     </div>

                     <div className="text-sm">
                       <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                         Forgot your password?
                       </a>
                     </div>
                   </div>
        <button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Sign In
        </button>
    </form>
  )
}

export default LoginForm
