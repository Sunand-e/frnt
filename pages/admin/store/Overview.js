import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminStoreOverview = () => {

  usePageTitle({ title: 'Overview' })

  return (
    <></>
  )
}

AdminStoreOverview.navState = {
topLevel: 'store',
secondary: 'overview'
}

export default AdminStoreOverview