import { useEffect, useState } from 'react';
import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import Button from '../common/Button';
import { QrCode } from "@styled-icons/material/QrCode";
import { MessageSquare } from "@styled-icons/feather/MessageSquare";
import { Mail } from "@styled-icons/feather/Mail";

const TwoSVForm = () => {

  const { user } = useGetCurrentUser()
  const [mfaEnabled, setMfaEnabled] = useState(user?.mfaEnabled);
  const [buttonText, setButtonText] = useState('Turn On 2-Step Verification')

  const ToggleMFA = () => {
    setMfaEnabled(!mfaEnabled)
  }

  const options = [
    { icon: QrCode, title: "Authenticator", action: "Add authenticator app", alert: true },
    { icon: MessageSquare, title: "Phone number", action: "Add a phone number", alert: true },
    { icon: Mail, title: "Email", action: "Add a Email address", alert: true }
  ];

  useEffect(() => {
    mfaEnabled ? setButtonText('Turn Off 2-Step Verification') : setButtonText('Turn On 2-Step Verification')
  }, [mfaEnabled])

  return (
    <div className='flex-grow'>
      <div className='flex mb-3 justify-end'>
        <Button displayType={mfaEnabled ? "white" : "normal"} onClick={ToggleMFA}> {buttonText} </Button>
      </div>
      <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Second steps</h2>
        <p className="text-gray-500 text-sm mb-4">
          Make sure you can access your account by keeping this information up to date and adding more sign-in options.
        </p>
        <div className="space-y-4">
          {options.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <item.icon className="w-6 h-6 text-gray-600" />
                <span className="text-gray-700">{item.title}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-600">
                {item.alert && <span className="text-yellow-500">⚠</span>}
                <span>{item.action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TwoSVForm
