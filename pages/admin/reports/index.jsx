import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePageTitle from '../../../hooks/usePageTitle'
import Reporting from '../../../components/reporting/Reporting'
const AdminReports = () => {

  usePageTitle({ title: 'Reports' })
  
  useHeaderButtons([
    ['Course reports', '/admin/reports'],
    ['User reports', '/admin/reports?view=users']
  ])
  
  return (
    <Reporting />
  )
}

AdminReports.navState = {
topLevel: 'reports',
secondary: 'overview'
}

export default AdminReports