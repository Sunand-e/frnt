import usePageTitle from '../../../hooks/usePageTitle'
import Reporting from '../../../components/Reporting/Reporting'
import useHeaderButtons from '../../../hooks/useHeaderButtons'

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
