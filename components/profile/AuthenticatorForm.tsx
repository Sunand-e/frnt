import useGetCurrentUser from '../../hooks/users/useGetCurrentUser';
import { Plus } from "@styled-icons/feather/Plus";
import { QrCode } from "@styled-icons/material/QrCode";
import ItemWithImage from '../common/cells/ItemWithImage';
import { Delete } from "@styled-icons/material/Delete";
import useConfirmDelete from '../../hooks/useConfirmDelete';
import useUpdateUser from '../../hooks/users/useUpdateUser';

const AuthenticatorForm = () => {
  const { user } = useGetCurrentUser()
  const { updateUser } = useUpdateUser();

  const deleteAuthenticator = () => {
    const updatedUser = { ...user, otpSecret: null, otpSecretVerified: null };
    updateUser(updatedUser);
  };

  const { confirmDelete } = useConfirmDelete({
    itemType: 'Authenticator',
    name: 'Authenticator',
    onConfirm: () => deleteAuthenticator()
  })
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl">
          <p className="text-gray-700 text-lg">
            Instead of waiting for text messages, get verification codes from an
            authenticator app. It works even if your phone is offline.
          </p>
          <p className="mt-4 text-gray-700">
            First, download Authenticator App.
          </p>
        </div>
        {!user?.otpSecretVerified && <div className="mt-8">
          <button className="mt-6 flex items-center gap-2 px-4 py-2 border rounded-full text-main border-gray-300 hover:bg-gray-200 transition">
            <Plus className="w-6 h-6"/>Set up authenticator
          </button>
        </div>}
      </div>
      {<div className="mx-auto p-6 border rounded-lg">
        <h2 className="text-xl font-semibold">Your authenticator</h2>
        <div className="space-y-4">
          <div
            className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[2fr_40px] items-center w-full p-4 gap-x-4"
          >
            <div className="flex items-center space-x-3 text-left">
              <ItemWithImage
                title='Authenticator'
                secondary='Added 15 hours ago'
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
