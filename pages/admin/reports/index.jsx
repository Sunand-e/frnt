import usePageTitle from '../../../hooks/usePageTitle'
import Reporting from '../../../components/reporting/Reporting'
import useHeaderButtons from '../../../hooks/useHeaderButtons'
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import {Users} from "@styled-icons/fa-solid/Users"
import {Group2} from "@styled-icons/remix-fill/Group2"

const AdminReports = () => {

  usePageTitle({ title: 'Reports' })
  
  useHeaderButtons([
    [<><GraduationCap className='w-5 mr-2 -ml-1'/> Courses</>, '/admin/reports?type=course'],
    [<><Users className='w-5 mr-2 -ml-1'/> Users</>, '/admin/reports?type=user'],
    [<><Group2 className='w-5 mr-2 -ml-1'/> Groups</>, '/admin/reports?type=group'],
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
