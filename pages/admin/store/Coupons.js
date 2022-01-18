import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminStoreCoupons = () => {

  usePageTitle({ title: 'Coupons' })

  return (
    <></>
  )
}

AdminStoreCoupons.navState = {
topLevel: 'store',
secondary: 'coupons'
}

export default AdminStoreCoupons