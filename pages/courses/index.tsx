import usePageTitle from "../../hooks/usePageTitle";
import CourseTabs from '../../components/dashboard/CourseTabs';

const Courses = () => {

  usePageTitle({ title: 'My Courses' })

  return (
    <CourseTabs />
  )
}

Courses.navState = {
  topLevel: 'courses',
  secondary: 'mycourses'
}

export default Courses