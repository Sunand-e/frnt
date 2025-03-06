import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import { Plus } from "@styled-icons/feather/Plus";
import { QrCode } from "@styled-icons/material/QrCode";
import ItemWithImage from '../common/cells/ItemWithImage';
import { Delete } from "@styled-icons/material/Delete";
import useConfirmDelete from '../../hooks/useConfirmDelete';
import useUpdateUser from '../../hooks/users/useUpdateUser';
import { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import { QRCode } from "react-qrcode-logo";
import Button from '../common/Button';
import OTPInput from '../common/inputs/OTPInput';
import { useRouter } from 'next/router';
import { GET_CURRENT_USER } from '../../graphql/queries/users';
import { client } from '../../graphql/client';

const AuthenticatorForm = () => {
  const { user } = useGetCurrentUser()
  const { updateUser } = useUpdateUser();
  const [loadingQR, setLoadingQR] = useState(false);
  const [authenticatorQRURL, setAuthenticatorQRURL] = useState(null);
  const [authenticatorSecret, setAuthenticatorSecret] = useState(null);
  const [QRsacned, setQRsacned] = useState(false);
  const router = useRouter()
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(authenticatorSecret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteAuthenticator = () => {
    const updatedUser = { ...user, otpSecret: null, otpSecretVerified: null };
    updateUser(updatedUser);
  };

  const setupAuthenticator = () => {
    setLoadingQR(true);
    fetch(`/api/v1/generate_authenticator_secret`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.error) {
            console.log(result.error)
          } else {
            setAuthenticatorSecret(result.otp_secret)
            setAuthenticatorQRURL(result.otp_url)
          }
          setLoadingQR(false);
        },
      )
  }

  const verifyOTP = (otp: string) => {
    const data = {
      otp_code: otp
    }
    fetch(`/api/v1/verify_authenticator_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.success) {
            client.refetchQueries({
              include: [GET_CURRENT_USER], // Refetch the current user query to get the updated data
            });
            router.push('/profile/twosv')
          } else {
            setError(result.message)
          }
        },
      )
  }

  const { confirmDelete } = useConfirmDelete({
    itemType: 'Authenticator',
    name: 'Authenticator',
    onConfirm: () => deleteAuthenticator()
  })

  const formatSecretKey = (key: string) => {
    return key.replace(/(.{4})/g, "$1 ").trim(); // Adds space every 4 characters
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl">
          <p className="text-gray-700 text-lg">
            Instead of waiting for text messages, get verification codes from an
            authenticator app. It works even if your phone is offline.
          </p>
          <p className="mt-4 text-gray-700">
            First, download Authenticator App.
          </p>
        </div>
        <div className="mt-8">
          {!authenticatorQRURL && !loadingQR && !user?.otpSecretVerified &&
            <button className="mt-6 flex items-center gap-2 px-4 py-2 border rounded-full text-main border-gray-300 hover:bg-gray-200 transition" onClick={setupAuthenticator}>
              <Plus className="w-6 h-6" />Set up authenticator
            </button>
          }
          {loadingQR && <LoadingSpinner />}
          {authenticatorQRURL && !QRsacned &&
            <div className='flex flex-col items-center gap-5'>
              <div className="p-4 border rounded-lg shadow-md">
                <h2 className="text-lg font-bold">Set Up Your Authenticator App</h2>
                <p className="text-gray-600 mb-3">
                  Scan the QR code below <strong>OR</strong> follow the manual setup instructions.
                </p>
                <div className='flex items-center'>
                  <QRCode value={authenticatorQRURL} size={256} />
                  <ol className="list-decimal pl-8 space-y-2 text-gray-700">
                    <li>Open your authenticator app (Google Authenticator, Authy, etc.).</li>
                    <li>Tap the <strong>+</strong> icon, then select <strong>Enter a setup key</strong>.</li>
                    <li>Enter your email</li>
                    <li>Enter this key (spaces don’t matter):</li>
                    <div className="bg-gray-100 p-2 rounded-md font-mono text-sm flex justify-between items-center">
                      <span>{formatSecretKey(authenticatorSecret)}</span>
                      <button
                        onClick={copyToClipboard}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <li>Ensure <strong>Time-based</strong> is selected.</li>
                    <li>Tap <strong>Add</strong> to finish.</li>
                  </ol>
                </div>
              </div>
              <Button onClick={() => { setQRsacned(true) }}> Next </Button>
            </div>
          }
          {QRsacned &&
            <>
              <OTPInput onComplete={verifyOTP} />
              {error && (<p className="ml-3 text-danger text-red-500">{error}</p>)}
            </>
          }
        </div>
      </div>
      {user?.otpSecretVerified && <div className="mx-auto p-6 border rounded-lg">
        <h2 className="text-xl font-semibold">Your authenticator</h2>
        <div className="space-y-4">
          <div
            className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[2fr_40px] items-center w-full p-4 gap-x-4"
          >
            <div className="flex items-center space-x-3 text-left">
              <ItemWithImage
                title='Authenticator'
                icon={<QrCode className="w-10 h-10 text-gray-600" />}
              />
            </div>
            <div className="flex justify-end">
              <button onClick={confirmDelete} className="m-1 p-2 flex items-center">
                <Delete size={24} className="mr-1 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default AuthenticatorForm;
