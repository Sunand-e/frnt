import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminStoreOffers = () => {

  usePageTitle({ title: 'Offers' })

  return (
    <></>
  )
}

AdminStoreOffers.navState = {
topLevel: 'store',
secondary: 'offers'
}

export default AdminStoreOffers