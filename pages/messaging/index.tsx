import Messaging from '../../components/messaging/Messaging';
import usePageTitle from '../../hooks/usePageTitle';
import MessagingLayout from '../../layouts/MessagingLayout';

const MessagingPage = () => {

  usePageTitle({ title: 'Messaging' })
  
  return (
    <>
      <Messaging />
    </>
  )
}
MessagingPage.getLayout = page => (
  <MessagingLayout
    navState={{
      topLevel: 'Messaging',
      secondary: 'Messaging'
    }}
    page={page}
  />
)

export default MessagingPage