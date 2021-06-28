import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminStoreOverview = () => {

  return (
    <PageTitle title="Overview" />
  )
}

AdminStoreOverview.navState = {
topLevel: 'store',
secondary: 'overview'
}

export default AdminStoreOverview