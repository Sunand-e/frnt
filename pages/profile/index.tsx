import usePageTitle from '../../hooks/usePageTitle';
import useHeaderButtons from '../../hooks/useHeaderButtons';
import useGetUser from '../../hooks/users/useGetUser';
import {ArrowBack} from '@styled-icons/boxicons-regular/ArrowBack';
import ProfileForm from '../../components/profile/ProfileForm';
import ProfileMenu from '../../components/profile/ProfileMenu';

const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to Dashboard</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const ProfilePage = () => {

  usePageTitle({ title: `Profile` })

  useHeaderButtons([
    [<BackButton />, '/']
  ])

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
