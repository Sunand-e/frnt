import usePageTitle from '../../../hooks/usePageTitle'
import Reporting from '../../../components/reporting/Reporting'
import useHeaderButtons from '../../../hooks/useHeaderButtons'
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import {Users} from "@styled-icons/fa-solid/Users"
import {Group2} from "@styled-icons/remix-fill/Group2"
import { useRouter } from 'next/router'
import Button from '../../../components/common/Button'
import useTenantFeaturesEnabled from '../../../hooks/users/useTenantFeaturesEnabled'

const ButtonWithIcon = ({text, action, icon: IconComponent}) => {
  const router = useRouter()
  return (
    <Button onClick={() => router.push(action)}>
      <IconComponent className='w-5 mr-2 -ml-1'/> {text}
    </Button>
  )
}

const AdminReports = () => {

  const { tenantFeaturesEnabled } = useTenantFeaturesEnabled()

  usePageTitle({ title: 'Reports' })
  
  useHeaderButtons([
    {
      id: 'coursesReport',
      component: <ButtonWithIcon text='Courses' action='/admin/reports?type=course' icon={GraduationCap} />
    },
    {
      id: 'usersReport',
      component: <ButtonWithIcon text='Users' action='/admin/reports?type=user' icon={Users} />
    },
    ...(tenantFeaturesEnabled(['groups']) ? [{
      id: 'groupReport',
      component: <ButtonWithIcon text='Groups' action='/admin/reports?type=group' icon={Group2} />
    }] : [])
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
