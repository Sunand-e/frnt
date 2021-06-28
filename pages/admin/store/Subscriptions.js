import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminStoreSubscriptions = () => {

  return (
    <PageTitle title="Subscriptions" />
  )
}

AdminStoreSubscriptions.navState = {
topLevel: 'store',
secondary: 'subscriptions'
}

export default AdminStoreSubscriptions