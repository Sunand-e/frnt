import { useRouter } from 'next/router';
import { isLoggedInVar } from '../../../graphql/cache';
import React, { useEffect, useState } from 'react';
import OTPInput from '../../common/inputs/OTPInput';
import Select from 'react-select';
import LoadingSpinner from '../../common/LoadingSpinner';
import useTimer from '../../../hooks/useTimer';

interface TwoFactorAuthProps {
  reset: any;
  setTwoFactorEnabled: any;
  twoSVCurrentOption: string;
  setTwoSVCurrentOption: React.Dispatch<React.SetStateAction<string>>;
  twoSVOptions: any;
  setTwoSVOptions: React.Dispatch<React.SetStateAction<any>>;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  reset,
  setTwoFactorEnabled,
  twoSVCurrentOption,
  setTwoSVCurrentOption,
  twoSVOptions,
  setTwoSVOptions
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otpSendTo, setOtpSendTo] = useState<string | null>(null);
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const { timer, canSend, resetTimer } = useTimer(30);

  const reLogin = () => {
    setTwoFactorEnabled(false);
    setTwoSVOptions(null);
    setTwoSVCurrentOption(null);
    setOtpSendTo(null);
    setOtpToken(null);
    setOtpError(null);
    reset({});
  };

  const formatMethod = (method: string) => {
    return method
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  const verificationMethods = twoSVOptions
    ? twoSVOptions.map((option: any) => ({
      value: option,
      label: formatMethod(option),
    }))
    : [];

  const sendOTP = async () => {
    setOtpError(null);
    if (twoSVCurrentOption === 'authenticator_app') {
      setOtpToken(null);
      setOtpSendTo(null);
    }

    if (twoSVCurrentOption === 'mobile_otp' || twoSVCurrentOption === 'email_otp') {
      setLoading(true);
      try {
        const res = await fetch(`api/v1/send_otp/${twoSVCurrentOption}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          res.json().then(error => {
            throw error;
          });
        }
        const result = await res.json();

        if (result.success) {
          setOtpToken(result.token);
          setOtpSendTo(result.otp_send_to);
        }
      } catch (_error) {
        reLogin();
      } finally {
        setLoading(false);
      }
    }

    resetTimer();
  };

  useEffect(() => {
    if (twoSVCurrentOption) {
      sendOTP();
    }
  }, [twoSVCurrentOption]);

  const submitOTP = async (otp: string) => {
    const data = { otp_token: otpToken, otp: otp };
    setLoading(true);
    try {
      const res = await fetch(`api/v1/two_factor_login/${twoSVCurrentOption}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        res.json().then(error => {
          throw error;
        });
      }
      const result = await res.json();

      if (result.status) {
        isLoggedInVar(true);
        router.push('/');
      } else if (result.error) {
        setOtpError(result.error);
      }
    } catch (_error) {
      reLogin();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Two-Factor Authentication</h2>
      <div>
        {loading && <LoadingSpinner />}
        {!loading && (
          <>
            <p className="text-sm text-gray-600 mb-2">
              {twoSVCurrentOption === 'authenticator_app' &&
                'Enter the code from your authenticator app to continue'}
              {twoSVCurrentOption === 'email_otp' &&
                `An email with a verification code was just sent to ${otpSendTo}`}
              {twoSVCurrentOption === 'mobile_otp' &&
                `An SMS with a verification code was just sent to ${otpSendTo}`}
            </p>
            <OTPInput onComplete={submitOTP} />
          </>
        )}
        {(twoSVCurrentOption === 'mobile_otp' || twoSVCurrentOption === 'email_otp') && (
          <div className="mt-3 flex justify-between items-center">
            <p className="text-danger text-red-500">{otpError && otpError}</p>
            <button
              disabled={!canSend}
              onClick={sendOTP}
              className="flex justify-center py-2 px-4 border border-transparent rounded-md text-sm text-main hover:bg-main-lightness-95"
            >
              {canSend ? 'Resend OTP' : `Resend in ${timer}s`}
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 text-sm">
        <label htmlFor="verification-method" className="text-sm text-gray-600 mb-2">Try Another Method</label>
        <Select
          id="verification-method"
          className="absolute z-10"
          styles={{
            menu: (base) => ({
              ...base,
              width: 'max-content',
              minWidth: '100%',
            }),
            control: (provided: any) => ({ ...provided, minWidth: '200px' }),
          }}
          defaultValue={{ value: twoSVCurrentOption, label: formatMethod(twoSVCurrentOption) }}
          onChange={(option) => setTwoSVCurrentOption(option?.value)}
          options={verificationMethods}
          isSearchable={false}
        />
      </div>
    </>
  );
};

export default TwoFactorAuth;
