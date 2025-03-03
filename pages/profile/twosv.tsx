import usePageTitle from '../../hooks/usePageTitle';
import useHeaderButtons from '../../hooks/useHeaderButtons';
import ProfileMenu from '../../components/profile/ProfileMenu';
import ButtonBack from '../../components/common/ButtonBack';
import TwoSV from '../../components/profile/TwoSV';

const ProfilePage = () => {

  usePageTitle({ title: `Profile - 2-Step Verification` })

  useHeaderButtons({
    id: "backToDashboard",
    component: <ButtonBack text="Back to dashboard" action="/" />
  });

  return (
    <div className='flex'>
      <ProfileMenu />
      <TwoSV />
    </div>
  )
}

ProfilePage.navState = {
  topLevel: 'dashboard'
}

export default ProfilePage
