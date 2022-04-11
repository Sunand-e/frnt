import AcceptInvitationForm from "../components/forms/AcceptInvitationForm"
import PageTitle from "../components/header/PageTitle"
import ContentEditor from "../components/SlateContentEditor/ContentEditor"
import usePageTitle from "../hooks/usePageTitle"

const AcceptInvitationPage = () => {

  usePageTitle({ title: `Welcome to the Learning Platform` })

  return (
    <>
      <AcceptInvitationForm />
    </>
  )
}

AcceptInvitationPage.isPublicPage = true

export default AcceptInvitationPage