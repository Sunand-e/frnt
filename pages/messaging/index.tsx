import { useEffect } from 'react';
import Messaging from '../../components/Messaging/Messaging';
import MessagingSidebar from '../../components/Messaging/MessagingSidebar';
import { viewVar } from '../../graphql/cache';
import usePageTitle from '../../hooks/usePageTitle';
import FullWidthLayout from '../../layouts/MessagingLayout';

const MessagingPage = () => {

  usePageTitle({ title: 'Messaging' })
  
  useEffect(() => {
    const view = {
      isSlimNav: true,
      showSecondary: false,
      ...viewVar()
    }
    viewVar(view)
    return () => {
      const view = viewVar()
      delete view.isSlimNav
      delete view.showSecondary
      const newView = { ...view }
      viewVar(newView)
    }
  },[])

  return (
    <>
      <Messaging />
    </>
  )
}
MessagingPage.getLayout = page => (
  <FullWidthLayout
    navState={{
      topLevel: 'Messaging',
      secondary: 'Messaging'
    }}
    page={page}
  />
)

export default MessagingPage