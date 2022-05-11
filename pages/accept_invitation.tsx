import AcceptInvitationForm from "../components/forms/AcceptInvitationForm"
import usePageTitle from "../hooks/usePageTitle"

const AcceptInvitationPage = () => {

  usePageTitle({ title: `Welcome to the Learning Platform` })

  return (
    <>
    <h2 className="mb-4 text-main-dark">Accept invitation</h2>
      <AcceptInvitationForm />
    </>
  )
}

AcceptInvitationPage.isPublicPage = true

export default AcceptInvitationPage