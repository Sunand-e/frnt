import React, { useEffect, useMemo, useState } from "react";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Button from '../common/Button';
import TextInput from '../common/inputs/TextInput';
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser";
import OTPInput from "../common/inputs/OTPInput";

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

  const sendOTP = () => {
    setValue("otpVerifiedToken", null)
    console.log(`Send OTP on: ${phoneNumber}`)
    setOtpSent(true);
  }

  const handleVerifyOTP = (otp: string) => {
    console.log(`OTP: ${otp}`)
    setValue("otpVerifiedToken", "oTFmPchEUotkHUr5HuDl1wtO2dOZOyM=--PVGVUqrzMe3a9HL8--Ky2gZcPj5wv0SrfDHkZm7w==")
    // setError('Incorrect OTP')
  };

  // useEffect(()=> {
  //   setValue("otpVerifiedToken", verifiedToken)
  // }, [verifiedToken])

  const phoneNumberChanged = useMemo(()=> {
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
          { phoneNumberChanged &&
            <Button disabled={!(phoneNumber && parsePhoneNumberFromString(phoneNumber)?.isValid())} onClick={sendOTP} className="ml-2">
              { otpSent ? "Resend OTP" : "Send OTP" }
            </Button>
          }
        </div>
        {errors.phoneNumber && (<small className="text-danger text-red-500">{errors.phoneNumber.message}</small>)}
      </div>
      { (verifiedToken || (!verifiedToken && otpSent) && phoneNumberChanged) && 
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
