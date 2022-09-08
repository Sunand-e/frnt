import ResetPasswordForm from "../components/forms/ResetPasswordForm"
import usePageTitle from "../hooks/usePageTitle"

const ResetPasswordPage = () => {

  usePageTitle({ title: `Reset password` })

  return (
    <ResetPasswordForm />
  )
}

ResetPasswordPage.isPublicPage = true

export default ResetPasswordPage