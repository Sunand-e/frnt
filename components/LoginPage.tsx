import Router from 'next/router';
import { isLoggedInVar } from '../graphql/cache';
import LoginForm from './LoginForm';

const ENDPOINT_SIGNIN = '/auth/users/sign_in'

const LoginPage = () => {

  // const isLoggedIn = useReactiveVar(isLoggedInVar);

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      user: {
        remember_me: "1",
        ...values
      }
    }

    console.log('fetch........')
    fetch(ENDPOINT_SIGNIN, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log('result........')
        if(result.token) {
          console.log('result!!')
          localStorage.setItem('token', result.token as string);
          isLoggedInVar(true);
          Router.push('/');
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log('ERROR:')
        console.log(error)
        // this.setState({
        //   isLoaded: true,
        //   error
        // });
      }
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logo-color.png`} 
          alt="Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        {/* <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            start your 14-day free trial
          </a>
        </p> */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage