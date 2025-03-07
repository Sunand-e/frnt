import { useRouter } from 'next/router';
import { isLoggedInVar } from '../../../graphql/cache';
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import TextInput from "../../common/inputs/TextInput";
import Link from 'next/link';
import BlinkingEllipsis from '../../common/misc/BlinkingEllipsis';
import OTPInput from '../../common/inputs/OTPInput';
import Select from 'react-select'
import LoadingSpinner from '../../common/LoadingSpinner';

const ENDPOINT_SIGNIN = '/api/v1/user/sign_in'

interface UserLoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [twoSVOptions, setTwoSVOptions] = useState(null);
  const [twoSVCurrentOption, setTwoSVCurrentOption] = useState(null);
  const [otpSendTo, setOtpSendTo] = useState(null);
  const [otpToken, setOtpToken] = useState(null);
  const [otpError, setOtpError] = useState(null);
  const [timer, setTimer] = useState(30);
  const [canSend, setCanSend] = useState(true);

  useEffect(() => {
    if (timer === 0) {
      setCanSend(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [timer]);

  const { setError, register, handleSubmit, watch, formState: { errors } } = useForm<UserLoginFormValues>({});
  
  const formatMethod = (method: string) => {
    return method
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  const verificationMethods = twoSVOptions ? [
    ...twoSVOptions.map((twoSVOption: string) => ({
      value: twoSVOption,
      label: formatMethod(twoSVOption)
    }))
  ] : []

  const onSubmit = (values: any) => {
    const data = {
      ...values
    }
    setLoading(true)
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
          if (result.status) {
            if(result.mfa_enabled){
              setTwoFactorEnabled(true);
              setTwoSVOptions(result.active_option)
              setTwoSVCurrentOption(result.default_option)
            }
            else {
              isLoggedInVar(true);
              router.push('/');
            }
          } else if (result.error) {
            setError('password', {
              type: "server",
              message: 'Username or password is incorrect',
            });
          }
          setLoading(false)
        },
      )
  }

  const sendOTP = () => {
    setOtpError(null)
    if(twoSVCurrentOption == 'authenticator_app') {
      setOtpToken(null);
      setOtpSendTo(null);
    }

    if(twoSVCurrentOption == 'mobile_otp' || twoSVCurrentOption == 'email_otp'){
      setLoading(true)
      fetch(`api/v1/send_otp/${twoSVCurrentOption}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (result.success) {
              setOtpToken(result.token);
              setOtpSendTo(result.otp_send_to);
            }
            setLoading(false)
          },
        )
    }
    setTimer(30); // Reset the timer to 30 seconds
    setCanSend(false);
  }

  useEffect(() => {
    sendOTP()
  }, [twoSVCurrentOption])

  const submitOTP = (otp: string) => {
    const data = {
      otp_token: otpToken,
      otp: otp,
    }
    setLoading(true)
    fetch(`api/v1/two_factor_login/${twoSVCurrentOption}`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.status) {
            isLoggedInVar(true);
              router.push('/');
          } else if (result.error) {
            setOtpError(result.error);
          }
          setLoading(false)
        },
      )
  }

  return (
    <>
      {!twoFactorEnabled &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email address"
            placeholder="Email address"
            inputAttrs={register("email", {
              required: "Email is required",
              maxLength: {
                value: 160,
                message: "Max length of the email address is 160 characters"
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/i,
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
              required: "Password is required"
            })}
          />
          {errors.password && (<small className="text-danger text-red-500">{errors.password.message}</small>)}

          <button
            className="w-full flex justify-center py-2 px-4 mt-4 mb-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:bg-main-dark-05 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
           Sign In {loading && <BlinkingEllipsis/> }
          </button>

          <div className="text-sm">
            <Link href="/lost-password" className="font-medium text-main hover:opacity-70">
              Forgot your password?
            </Link>
          </div>
        </form>
      }
      {twoFactorEnabled && 
        <>
          <h2 className="text-xl font-bold mb-4">Two-Factor Authentication</h2>
          <div>
            {loading && <LoadingSpinner/>}
            {!loading && <><p className="text-sm text-gray-600 mb-2">
              { twoSVCurrentOption == 'authenticator_app' && 'Enter the code from your authenticator app to Continue' }
              { twoSVCurrentOption == 'email_otp' && `An email with verification code was just send to ${watch('email')}`}
              { twoSVCurrentOption == 'mobile_otp' && `An sms with verification code was just send to ${otpSendTo}`}
            </p>
            <OTPInput onComplete={submitOTP} /></>}
            {(twoSVCurrentOption == 'mobile_otp' || twoSVCurrentOption == 'email_otp') && 
              <div className='mt-3 flex justify-end'>
                <button disabled={!canSend} onClick={sendOTP} className="flex justify-center py-2 px-4 border border-transparent rounded-md text-sm text-main hover:bg-main-lightness-95 ">
                  {canSend ? "Resend OTP" :  `Resend in ${timer}s`}
                </button>
              </div>
            }
            {otpError && (<p className="ml-3 text-danger text-red-500">{otpError}</p>)}
          </div>
          <div className="mt-4 text-sm">
            <label htmlFor="verification-method" className="text-sm text-gray-600 mb-2">Try Another Method</label>
            <Select
              id="verification-method"
              className='absolute z-10'
              styles={{
                menu: (base) => ({
                  ...base,
                  width: "max-content",
                  minWidth: "100%"
                }),
                control: (provided: any) => ({ ...provided, minWidth: "200px" }),
              }}
              defaultValue={{value: twoSVCurrentOption, label: formatMethod(twoSVCurrentOption) }}
              onChange={(option) => setTwoSVCurrentOption(option?.value)}
              options={verificationMethods}
              isSearchable={false}
            />
          </div>
        </>
      }
    </>
  );
}

export default LoginForm
