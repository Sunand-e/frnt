import React, { useMemo, useState } from "react";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Button from '../common/Button';
import TextInput from '../common/inputs/TextInput';
import useGetCurrentUser from "../../hooks/users/useGetCurrentUser";
import OTPInput from "../common/inputs/OTPInput";
import BlinkingEllipsis from "../common/misc/BlinkingEllipsis";
import useTimer from "../../hooks/useTimer";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface PhoneNumberInputProps {
  isOnlyCountryCode: any;
  setValue: any;
  watch: any;
}

const ForwardedTextInput = React.forwardRef<HTMLInputElement, any>((props, ref) => {
  return (
    <TextInput
      {...props}
      inputAttrs={{
        ...props.inputAttrs,
        ref,
        value: props.value,
        onChange: props.onChange,
        onBlur: props.onBlur
      }}
    />
  );
});

ForwardedTextInput.displayName = "ForwardedTextInput";

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ isOnlyCountryCode, setValue, watch }) => {
  const phoneNumber = watch("phoneNumber");
  const { user } = useGetCurrentUser();
  const verifiedToken = watch("otpVerifiedToken");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [otpSending, setOtpSending] = useState(false);
  const { timer, canSend, resetTimer } = useTimer(30);

  const phoneNumberChanged = useMemo(() => !isOnlyCountryCode(phoneNumber) && user?.phoneNumber !== phoneNumber && !!phoneNumber, [user, phoneNumber]);

  const handleSendOTP = async () => {
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) return;

    const data = { phone_number: phoneNumber };
    setOtpSending(true);
    try {
      const response = await fetch('/api/v1/send_mobile_otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setOtpToken(result.token);
        setError('');
        setOtpSent(true);
        resetTimer();
      }
    } catch (error) {
      setError("An error occurred while sending the OTP.");
    } finally {
      setOtpSending(false);
    }
    setValue("otpVerifiedToken", null);
  };

  const handleVerifyOTP = async (otp: string) => {
    const data = { otp, otp_token: otpToken };
    try {
      const response = await fetch('/api/v1/verify_mobile_otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setError('');
        setValue("otpVerifiedToken", result.token);
      }
    } catch (error) {
      setError("An error occurred while verifying the OTP.");
    }
  };

  const handlePhoneNumberChange = (value: any) => {
    setValue("phoneNumber", value);
    setOtpSent(false);
    setOtpToken(null);
    setValue("otpVerifiedToken", null);
  };

  const validatePhoneNumber = (value: string) => {
    const parsedNumber = parsePhoneNumberFromString(value);
    return parsedNumber?.isValid() || false;
  };

  return (
    <>
      <div>
        <label htmlFor="phoneNumber">Mobile <span className="text-gray-500 italic">(Optional)</span></label>
        <div className='flex'>
          <PhoneInput
            international
            defaultCountry="GB"
            countryCallingCodeEditable={false}
            placeholder="Enter Mobile Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            inputComponent={ForwardedTextInput}
            onBlur={() => {
              if (phoneNumber && !isOnlyCountryCode(phoneNumber)  && !validatePhoneNumber(phoneNumber)) {
                setError("Please enter a valid phone number.");
              } else {
                setError('');
              }
            }}
          />
          {phoneNumberChanged && !verifiedToken && (
            <Button
              disabled={!(phoneNumber && validatePhoneNumber(phoneNumber)) || !canSend}
              onClick={handleSendOTP}
              className="ml-2"
            >
              {otpSending ? <>Sending<BlinkingEllipsis /></> : otpSent ? (canSend ? "Resend OTP" : `Resend in ${timer}s`) : "Send OTP"}
            </Button>
          )}
        </div>
      </div>

      {!verifiedToken && otpSent && phoneNumberChanged &&
        <div className='flex items-center'>
          <OTPInput onComplete={handleVerifyOTP} />
        </div>
      }

      {verifiedToken &&
        <div>
          <small>OTP Verified! You can proceed.</small>
        </div>
      }

      {!verifiedToken && error && <p className="text-danger text-red-500">{error}</p>}
    </>
  );
};

export default PhoneNumberInput;
