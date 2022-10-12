import Messaging from '../../../components/messaging/Messaging';
import usePageTitle from '../../../hooks/usePageTitle';
import MessagingLayout from '../../../layouts/MessagingLayout';

const AdminMessaging = () => {

  usePageTitle({ title: 'Messaging' })
  
  return (
    <Messaging />
  )
}

AdminMessaging.navState = {
topLevel: 'Messaging',
secondary: 'Messaging'
}

AdminMessaging.getLayout = page => (
  <MessagingLayout
    navState={{
      topLevel: 'Messaging',
      secondary: 'Messaging'
    }}
    page={page}
  />
)

export default AdminMessaging