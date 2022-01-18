import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminStoreProducts = () => {

  usePageTitle({ title: 'Products' })
  return (
    <></>
  )
}

AdminStoreProducts.navState = {
topLevel: 'store',
secondary: 'products'
}

export default AdminStoreProducts