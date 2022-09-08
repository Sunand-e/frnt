import LostPasswordForm from "../components/forms/LostPasswordForm"
import usePageTitle from "../hooks/usePageTitle"

const LostPasswordPage = () => {

  usePageTitle({ title: `Lost password` })

  return (
    <LostPasswordForm />
  )
}

LostPasswordPage.isPublicPage = true

export default LostPasswordPage