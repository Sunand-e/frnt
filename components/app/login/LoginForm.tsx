import { useRouter } from 'next/router';
import { isLoggedInVar } from '../../../graphql/cache';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from "../../common/inputs/TextInput";
import Link from 'next/link';
import BlinkingEllipsis from '../../common/misc/BlinkingEllipsis';
import TwoFactorAuth from './TwoFactorAuth';

const ENDPOINT_SIGNIN = '/api/v1/user/sign_in';

interface UserLoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [twoSVOptions, setTwoSVOptions] = useState<string[] | null>(null);
  const [twoSVCurrentOption, setTwoSVCurrentOption] = useState<string | null>(null);

  const { setError, register, handleSubmit, formState: { errors }, reset } = useForm<UserLoginFormValues>();

  const onSubmit = async (values: UserLoginFormValues) => {
    const data = { ...values };
    setLoading(true);
    try {
      const res = await fetch(ENDPOINT_SIGNIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.status) {
        if (result.mfa_enabled) {
          setTwoFactorEnabled(true);
          setTwoSVOptions(result.active_option);
          setTwoSVCurrentOption(result.default_option);
        } else {
          isLoggedInVar(true);
          router.push('/');
        }
      } else if (result.error) {
        setError('password', {
          type: 'server',
          message: 'Username or password is incorrect',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!twoFactorEnabled && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email address"
            placeholder="Email address"
            inputAttrs={register('email', {
              required: 'Email is required',
              maxLength: {
                value: 160,
                message: 'Max length of the email address is 160 characters',
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/i,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errors.email && <small className="text-danger text-red-600">{errors.email.message}</small>}
          <TextInput
            label="Password"
            placeholder="Password"
            type="password"
            className="mt-4"
            inputAttrs={register('password', { required: 'Password is required' })}
          />
          {errors.password && <small className="text-danger text-red-500">{errors.password.message}</small>}

          <button
            className="w-full flex justify-center py-2 px-4 mt-4 mb-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:bg-main-dark-05 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            Sign In {loading && <BlinkingEllipsis />}
          </button>

          <div className="text-sm">
            <Link href="/lost-password" className="font-medium text-main hover:opacity-70">
              Forgot your password?
            </Link>
          </div>
        </form>
      )}
      {twoFactorEnabled && (
        <TwoFactorAuth
          reset={reset}
          setTwoFactorEnabled={setTwoFactorEnabled}
          twoSVCurrentOption={twoSVCurrentOption}
          setTwoSVCurrentOption={setTwoSVCurrentOption}
          twoSVOptions={twoSVOptions}
          setTwoSVOptions={setTwoSVOptions}
        />
      )}
    </>
  );
};

export default LoginForm;
