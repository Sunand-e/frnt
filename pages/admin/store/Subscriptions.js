import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminStoreSubscriptions = () => {

  usePageTitle({ title: 'Subscriptions' })

  return (
    <></>
  )
}

AdminStoreSubscriptions.navState = {
topLevel: 'store',
secondary: 'subscriptions'
}

export default AdminStoreSubscriptions