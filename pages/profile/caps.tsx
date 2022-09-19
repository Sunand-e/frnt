import usePageTitle from '../../hooks/usePageTitle';
import useHeaderButtons from '../../hooks/useHeaderButtons';
import useGetUser from '../../hooks/users/useGetUser';
import {ArrowBack} from '@styled-icons/boxicons-regular/ArrowBack';
import ProfileForm from '../../components/profile/ProfileForm';
import ProfileMenu from '../../components/profile/ProfileMenu';
import ChangePasswordForm from '../../components/profile/ChangePasswordForm';
import Caps from '../../components/profile/Caps';

const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to Dashboard</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const ProfilePage = () => {

  usePageTitle({ title: `Profile - Change Password` })

  useHeaderButtons([
    [<BackButton />, '/']
  ])

  return (
    <div className='flex'>
      <ProfileMenu />
      <Caps />
    </div>
  )
}
ProfilePage.navState = {
  topLevel: 'dashboard'
}
export default ProfilePage
