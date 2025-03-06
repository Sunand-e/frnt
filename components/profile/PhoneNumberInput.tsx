import React, { useEffect, useMemo, useState } from "react";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Button from '../common/Button';
import TextInput from '../common/inputs/TextInput';
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser";
import OTPInput from "../common/inputs/OTPInput";
import BlinkingEllipsis from "../common/misc/BlinkingEllipsis";

interface PhoneNumberInputProps {
  register: any;
  setValue: any;
  errors: any;
  watch: any;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ register, setValue, errors, watch }) => {
  const phoneNumber = watch("phoneNumber");
  const { user } = useGetCurrentUser()
  const verifiedToken = watch("otpVerifiedToken");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [otpToken, setOtpToken] = useState(null);
  const [otpSending, setOtpSending] = useState(false);
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

  const sendOTP = () => {
    const data = {
      phone_number: phoneNumber
    }
    setOtpSending(true);
    fetch(`/api/v1/send_mobile_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.error) {
            console.log(result.error)
          } else {
            setOtpToken(result.token)
            setOtpSent(true);
          }
          setOtpSending(false);
        },
      )
    setValue("otpVerifiedToken", null)
    setTimer(30); // Reset the timer to 30 seconds
    setCanSend(false);
  }

  const handleVerifyOTP = (otp: string) => {
    const data = {
      otp: otp,
      otp_token: otpToken
    }
    fetch(`/api/v1/verify_mobile_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.error) {
            setError(result.error)
          } else {
            setValue("otpVerifiedToken", result.token)
          }
        },
      )
  };

  const phoneNumberChanged = useMemo(() => {
    return user?.phoneNumber != phoneNumber
  }, [user, phoneNumber])

  return (
    <>
      <div>
        <label htmlFor="phoneNumber">
          Mobile <span className="text-gray-500 italic">(Optional)</span>
        </label>
        <div className='flex'>
          <TextInput
            placeholder="Enter Mobile Number"
            inputAttrs={register("phoneNumber", {
              onChange: (e: any) => {
                setValue("phoneNumber", e.target.value.replace(/\s/g, ""))
                setOtpSent(false)
                setValue("otpVerifiedToken", null)
              },
            })}
          />
          {phoneNumberChanged &&
            <Button disabled={!(phoneNumber && parsePhoneNumberFromString(phoneNumber)?.isValid()) || !canSend} onClick={sendOTP} className="ml-2">
              {otpSending ? <>Sending<BlinkingEllipsis /></> : otpSent ? canSend ? "Resend OTP" :  `Resend in ${timer}s` : "Send OTP"}
            </Button>
          }
        </div>
        {errors.phoneNumber && (<small className="text-danger text-red-500">{errors.phoneNumber.message}</small>)}
      </div>
      {(verifiedToken || (!verifiedToken && otpSent) && phoneNumberChanged) &&
        (<div>
          {!verifiedToken && otpSent && (
            <div className='flex items-center'>
              <OTPInput
                onComplete={handleVerifyOTP}
              />
              {error && (<p className="ml-3 text-danger text-red-500">{error}</p>)}
            </div>
          )}
          {verifiedToken && (<small>OTP Verified! You can proceed.</small>)}
        </div>)
      }
    </>
  );
};

export default PhoneNumberInput;
