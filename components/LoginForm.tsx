import { useReactiveVar } from '@apollo/client';
import { Formik } from 'formik';
import { isLoggedInVar } from '../graphql/cache';

const ENDPOINT_SIGNIN = '/auth/users/sign_in'

const LoginForm = () => {

  // const isLoggedIn = useReactiveVar(isLoggedInVar);

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      user: values
    }

    console.log(data)

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
        if(result.token) {
          localStorage.setItem('token', result.token as string);
          isLoggedInVar(true);
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
    <div>
      <h1>Log In</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors:any = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}
 
 export default LoginForm;