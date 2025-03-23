import usePageTitle from '../../../hooks/usePageTitle';
import TwoSV from '../../../components/profile/TwoSV';
import AuthenticatorForm from '../../../components/profile/AuthenticatorForm';

const ProfilePage = () => {
  usePageTitle({ title: `Authenticator` })

  return (
    <TwoSV Component={AuthenticatorForm}/>
  )
}

ProfilePage.navState = {
  topLevel: 'dashboard'
}

export default ProfilePage
