import { useState, useCallback, useEffect } from 'react';
import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import Button from '../common/Button';
import { QrCode, Sms, Email,  } from "@styled-icons/material";
import { CheckCircle, AlertTriangle } from "@styled-icons/feather";
import { ChevronRight } from "@styled-icons/heroicons-outline";
import useUpdateUser from '../../hooks/users/useUpdateUser';
import Link from 'next/link';
import { toast } from 'react-toastify';

const TwoSVForm = () => {
  const { user } = useGetCurrentUser();
  const { updateUser } = useUpdateUser();
  
  const ToggleMFA = useCallback(() => {
    const updatedUser = { ...user, mfaEnabled: !user?.mfaEnabled };
    if(!user?.mfaEnabled){
      toast('You’re now protected with 2-Step Verification', {
        toastId: 'enable_2fa',
        hideProgressBar: false,
        autoClose: 2500
      })
    }
    updateUser(updatedUser);
  }, [user?.mfaEnabled, user, updateUser]);

  const options = [
    {
      icon: QrCode,
      title: "Authenticator",
      action: user?.otpSecretVerified ? "Authenticator enabled" : "Add authenticator app",
      alert: !user?.otpSecretVerified,
      url: '/profile/twosv/authenticator'
    },
    {
      icon: Sms,
      title: "Mobile",
      action: user?.phoneNumber ? user.phoneNumber : "Add a mobile number",
      alert: !user?.phoneNumber,
      url: '/profile'
    },
    {
      icon: Email,
      title: "Email",
      action: user?.email ? user.email : "Add Email Address",
      alert: !user?.email,
      url: '/profile'
    }
  ];

  return (
    <div className='flex-grow'>
      <div className='flex mb-3 justify-end'>
        <Button displayType={user?.mfaEnabled ? "white" : "normal"} onClick={ToggleMFA}>
          Turn { user?.mfaEnabled ? "Off" : "On" } 2-Step Verification
        </Button>
      </div>
      <div className="mx-auto p-6 border rounded-lg">
        <h2 className="text-xl font-semibold">Second steps</h2>
        <p className="text-gray-500 text-sm mb-4">
          Make sure you can access your account by keeping this information up to date and adding more sign-in options.
        </p>
        <div className="space-y-4">
          {options.map(({ icon: Icon, title, action, alert, url }, index) => (
            <Link href={url} key={index}>
              <div className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[2fr_2fr_40px] items-center w-full p-4 gap-x-4 hover:bg-black hover:bg-opacity-5 transition-colors duration-100">
                <div className="flex items-center space-x-3 text-left font-semibold">
                  <Icon className="w-8 h-8 text-gray-600" />
                  <span className="text-gray-700">{title}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-main text-left">
                  {alert ? (
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  <span>{action}</span>
                </div>
                <div className="flex justify-end">
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoSVForm;
