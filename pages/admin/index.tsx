import usePageTitle from '../../hooks/usePageTitle';
import { AdminDashTopBox } from '../../components/admin/dashboard/AdminDashTopBox';
import Graph from '../../components/admin/dashboard/Graph';
import { GraduationCap } from 'styled-icons/entypo';
import { Users } from 'styled-icons/fa-solid';
import Calendar from '../../components/Calendar/CalendarTime';
import CalendarDay from '../../components/Calendar/CalendarDay';
import CalendarTime from '../../components/Calendar/CalendarTime';
import GridLayout from '../../components/GridLayout/GridLayout';
import QuickActions from '../../components/admin/dashboard/QuickActions';

const AdminDashTopBoxes = ({boxes}) => (
  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 '>
    { boxes.map((box, index) => <AdminDashTopBox box={box} index={index} />) }
  </div>     
)

const AdminDashboard = () => {

  usePageTitle({ title: 'Admin Dashboard' })

  const topBoxes = [
    {
      name: 'allCourses',
      label: 'Total courses',
      value: 18,
      IconComponent: GraduationCap
    },
    {
      name: 'allUsers',
      label: 'Total users',
      value: 162,
      IconComponent: Users
    },
    {
      name: 'activeCourses',
      label: 'Active courses',
      value: 7,
      IconComponent: GraduationCap
    },
    {
      name: 'activeUsers',
      label: 'Active users',
      value: 37,
      IconComponent: Users
    },
  ]

  const gridLayout = [
    {
      "w": 8,
      "h": 8,
      "x": 0,
      "y": 0,
      "i": "a",
      "moved": false,
      "static": false
    },
    {
      "w": 4,
      "h": 10,
      "x": 8,
      "y": 8,
      "i": "b",
      "minW": 2,
      "maxW": 4,
      "moved": false,
      "static": false
    },
    {
      "w": 8,
      "h": 10,
      "x": 0,
      "y": 8,
      "i": "c",
      "moved": false,
      "static": false
    },
    {
      "w": 4,
      "h": 8,
      "x": 8,
      "y": 0,
      "i": "d",
      "moved": false,
      "static": false
    }
  ]

  return (
    <>
      <AdminDashTopBoxes boxes={topBoxes} />
      <GridLayout layout={gridLayout}>
        <Graph key="a" />
        <CalendarDay key="b" />
        <CalendarTime key="c" />
        <QuickActions key="d" />
      </GridLayout>
    </>
  )
}

AdminDashboard.navState = {
  topLevel: 'dashboard',
}

export default AdminDashboard
