import { useContext } from 'react';
import { TenantContext } from '../../../context/TenantContext';
import LoginForm from './LoginForm';
import Image from 'next/image';

const LoginPage = () => {

  // const isLoggedIn = useReactiveVar(isLoggedInVar);
  const tenant = useContext(TenantContext)
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        { tenant?.logo && (
        <img
          className="mx-auto h-12 w-auto"
          src={tenant?.logo}
          alt="Logo"
        />
        )}
        <h2 className="mt-6 text-center text-xl font-medium text-gray-900 text-main">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-4">
        <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
      <Image
        priority
        src="/images/zanda-logo-colour.svg"
        height={32}
        width={150}
        alt="Follow us on Twitter"
      />
    </div>
  )
}

export default LoginPage