import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'

const AdminReports = () => {

  usePageTitle({ title: 'Title' })
  
  return (
    <></>
  )
}

AdminReports.navState = {
topLevel: 'reports',
secondary: 'overview'
}

export default AdminReports