import SignUpForm from "../components/forms/SignUpForm"
import usePageTitle from "../hooks/usePageTitle"

const SignUpPage = () => {

  usePageTitle({ title: `Welcome to the Learning Platform` })

  return (
    <>
      <SignUpForm />
    </>
  )
}

SignUpPage.isPublicPage = true

export default SignUpPage