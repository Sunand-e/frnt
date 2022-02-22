import usePageTitle from '../../../hooks/usePageTitle';

const AdminMessaging = () => {

  usePageTitle({ title: 'Messaging' })
  
  return (
    <></>
  )
}

AdminMessaging.navState = {
topLevel: 'messaging',
secondary: 'messaging'
}

export default AdminMessaging