import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminStoreProducts = () => {

  return (
    <PageTitle title="Products" />
  )
}

AdminStoreProducts.navState = {
topLevel: 'store',
secondary: 'products'
}

export default AdminStoreProducts