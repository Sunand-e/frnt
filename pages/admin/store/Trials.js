import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminStoreTrials = () => {

  usePageTitle({ title: 'Trials' })

  return (
    <></>
  )
}

AdminStoreTrials.navState = {
topLevel: 'store',
secondary: 'trials'
}

export default AdminStoreTrials