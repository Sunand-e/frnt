import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageTitle from '../../../components/PageTitle';

const AdminStoreTrials = () => {

  return (
    <PageTitle title="Trials" />
  )
}

AdminStoreTrials.navState = {
topLevel: 'store',
secondary: 'trials'
}

export default AdminStoreTrials