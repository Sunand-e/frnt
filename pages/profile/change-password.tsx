import usePageTitle from '../../hooks/usePageTitle';
import useHeaderButtons from '../../hooks/useHeaderButtons';
import ProfileMenu from '../../components/profile/ProfileMenu';
import ChangePasswordForm from '../../components/profile/ChangePasswordForm';
import ButtonBack from '../../components/common/ButtonBack';

const ProfilePage = () => {

  usePageTitle({ title: `Profile - Change Password` })

  useHeaderButtons({
    id: "backToDashboard",
    component: <ButtonBack text="Back to dashboard" action="/" />
  });

  return (
    <div className='flex'>
      <ProfileMenu />
      <ChangePasswordForm />
    </div>
  )
}
ProfilePage.navState = {
  topLevel: 'dashboard'
}
export default ProfilePage
