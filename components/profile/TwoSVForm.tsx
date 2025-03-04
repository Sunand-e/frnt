import { useEffect, useState } from 'react';
import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import Button from '../common/Button';
import { QrCode } from "@styled-icons/material/QrCode";
import { Sms } from "@styled-icons/material/Sms";
import { Email } from "@styled-icons/material/Email";
import { CheckCircle } from "@styled-icons/feather/CheckCircle";
import { AlertTriangle } from "@styled-icons/feather/AlertTriangle";
import { ChevronRight } from "@styled-icons/heroicons-outline/ChevronRight";

const TwoSVForm = () => {
  const { user } = useGetCurrentUser()
  const [mfaEnabled, setMfaEnabled] = useState(user?.mfaEnabled);

  const ToggleMFA = () => {
    setMfaEnabled(!mfaEnabled)
  }

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const emailAction = user?.email ? user.email : "Add Email Address";
    const phoneAction = user?.phoneNumber ? user.phoneNumber : "Add a phone number";
    const authAction = user?.otpSecretVerified ? "Authenticator enabled" : "Add authenticator app";
    
    setOptions([
      { icon: QrCode, title: "Authenticator", action: authAction, alert: !user?.otpSecretVerified },
      { icon: Sms, title: "Phone Number", action: phoneAction, alert: !user?.phoneNumber },
      { icon: Email, title: "Email", action: emailAction, alert: !user?.email }
    ]);
  }, [user]);

  return (
    <div className='flex-grow'>
      <div className='flex mb-3 justify-end'>
        <Button displayType={mfaEnabled ? "white" : "normal"} onClick={ToggleMFA}> Turn {mfaEnabled ? "Off" : "On"} 2-Step Verification</Button>
      </div>
      <div className="mx-auto p-6 border rounded-lg">
        <h2 className="text-xl font-semibold">Second steps</h2>
        <p className="text-gray-500 text-sm mb-4">
          Make sure you can access your account by keeping this information up to date and adding more sign-in options.
        </p>
        <div className="space-y-4">
          {options.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[2fr_2fr_40px] items-center w-full p-4 gap-x-4"
            >
              <div className="flex items-center space-x-3 text-left font-semibold">
                <item.icon className="w-8 h-8 text-gray-600" />
                <span className="text-gray-700">{item.title}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-main text-left">
                {item.alert ? (
                  <span className="text-yellow-500">
                    <AlertTriangle className="w-6 h-6" />
                  </span>
                ) : (
                  <span className="text-green-500">
                    <CheckCircle className="w-6 h-6" />
                  </span>
                )}
                <span>{item.action}</span>
              </div>
              <div className="flex justify-end">
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TwoSVForm
