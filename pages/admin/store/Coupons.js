import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminStoreCoupons = () => {

  return (
    <PageTitle title="Coupons" />
  )
}

AdminStoreCoupons.navState = {
topLevel: 'store',
secondary: 'coupons'
}

export default AdminStoreCoupons