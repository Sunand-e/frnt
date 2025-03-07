import React, { useMemo, useState } from "react";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Button from '../common/Button';
import TextInput from '../common/inputs/TextInput';
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser";
import OTPInput from "../common/inputs/OTPInput";
import BlinkingEllipsis from "../common/misc/BlinkingEllipsis";
import useTimer from "../../hooks/useTimer";

interface PhoneNumberInputProps {
  register: any;
  setValue: any;
  watch: any;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ register, setValue, watch }) => {
  const phoneNumber = watch("phoneNumber");
  const { user } = useGetCurrentUser();
  const verifiedToken = watch("otpVerifiedToken");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [otpSending, setOtpSending] = useState(false);
  const { timer, canSend, resetTimer } = useTimer(30);

  const phoneNumberChanged = useMemo(() => {
    return user?.phoneNumber !== phoneNumber && phoneNumber !== '';
  }, [user, phoneNumber]);

  const sendOTP = async () => {
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) return;

    const data = { phone_number: phoneNumber };
    setOtpSending(true);
    try {
      const response = await fetch(`/api/v1/send_mobile_otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setOtpToken(result.token);
        setOtpSent(true);
        resetTimer();
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("An error occurred while sending the OTP.");
    } finally {
      setOtpSending(false);
    }
    setValue("otpVerifiedToken", null);
  };

  const handleVerifyOTP = async (otp: string) => {
    const data = { otp, otp_token: otpToken };
    try {
      const response = await fetch(`/api/v1/verify_mobile_otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setValue("otpVerifiedToken", result.token);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An error occurred while verifying the OTP.");
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    setValue("phoneNumber", value);
    setOtpSent(false);
    setValue("otpVerifiedToken", null);
  };

  const validatePhoneNumber = (value: string) => {
    const parsedNumber = parsePhoneNumberFromString(value);
    if (parsedNumber && !parsedNumber?.isValid()) {
      return false;
    }
    return true;
  };

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
              onChange: handlePhoneNumberChange,
              onBlur: () => {
                if (validatePhoneNumber(phoneNumber)) {
                  setError('');
                }else{
                  setError("Please enter a valid phone number.");
                }
              },
            })}
          />
          {phoneNumberChanged && !verifiedToken && (
            <Button
              disabled={!(phoneNumber && validatePhoneNumber(phoneNumber)) || !canSend}
              onClick={sendOTP}
              className="ml-2"
            >
              {otpSending ? (
                <>Sending<BlinkingEllipsis /></>
              ) : otpSent ? (
                canSend ? "Resend OTP" : `Resend in ${timer}s`
              ) : (
                "Send OTP"
              )}
            </Button>
          )}
        </div>
      </div>

      {(verifiedToken || (!verifiedToken && otpSent && phoneNumberChanged)) && (
        <div>
          {!verifiedToken && otpSent && (
            <div className='flex items-center'>
              <OTPInput onComplete={handleVerifyOTP} />
            </div>
          )}
          {verifiedToken && <small>OTP Verified! You can proceed.</small>}
        </div>
      )}
      {!verifiedToken && error && <p className="text-danger text-red-500">{error}</p>}
    </>
  );
};

export default PhoneNumberInput;
