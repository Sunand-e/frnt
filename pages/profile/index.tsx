import usePageTitle from '../../hooks/usePageTitle';
import useHeaderButtons from '../../hooks/useHeaderButtons';
import ProfileForm from '../../components/profile/ProfileForm';
import ProfileMenu from '../../components/profile/ProfileMenu';
import ButtonBack from '../../components/common/ButtonBack';

const ProfilePage = () => {

  usePageTitle({ title: `Profile` })

  useHeaderButtons({
    id: "backToDashboard",
    component: <ButtonBack text="Back to dashboard" action="/" />
  });

  return (
    <div className='flex'>
      <ProfileMenu />
      <ProfileForm />
    </div>
  )
}
ProfilePage.navState = {
  topLevel: 'dashboard'
}
export default ProfilePage
