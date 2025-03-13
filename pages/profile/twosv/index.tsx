import usePageTitle from '../../../hooks/usePageTitle';
import TwoSV from '../../../components/profile/TwoSV';
import TwoSVForm from '../../../components/profile/TwoSVForm';

const ProfilePage = () => {
  usePageTitle({ title: `2-Step Verification` })

  return (
    <TwoSV Component={TwoSVForm} />
  )
}

ProfilePage.navState = {
  topLevel: 'dashboard'
}

export default ProfilePage
