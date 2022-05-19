import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'
import Reporting from '../../../components/reporting/Reporting'
const AdminReports = () => {

  usePageTitle({ title: 'Reports' })
  
  return (
    <Reporting />
  )
}

AdminReports.navState = {
topLevel: 'reports',
secondary: 'overview'
}

export default AdminReports