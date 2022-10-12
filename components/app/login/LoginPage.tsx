import { useContext } from 'react';
import { TenantContext } from '../../../context/TenantContext';
import LoginForm from './LoginForm';

const LoginPage = () => {

  // const isLoggedIn = useReactiveVar(isLoggedInVar);
  const tenant = useContext(TenantContext)
  
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        { tenant?.logo && (
        <img
          className="mx-auto h-12 w-auto"
          src={tenant?.logo}
          alt="Logo"
        />
        )}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage