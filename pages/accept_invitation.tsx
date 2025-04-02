import AcceptInvitationForm from "../components/forms/AcceptInvitationForm"
import usePageTitle from "../hooks/usePageTitle"

const AcceptInvitationPage = () => {

  usePageTitle({ title: `Welcome to the Learning Platform` })

  return (
    <div className={`w-full flex flex-col items-center justify-center pt-8`}>
      <h2 className="mb-4 text-main text-xl">Accept invitation</h2>
      <AcceptInvitationForm />
    </div>
  )
}

AcceptInvitationPage.isPublicPage = true

export default AcceptInvitationPage