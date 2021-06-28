import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminStoreOffers = () => {

  return (
    <PageTitle title="Offers" />
  )
}

AdminStoreOffers.navState = {
topLevel: 'store',
secondary: 'offers'
}

export default AdminStoreOffers