import usePageTitle from "../../hooks/usePageTitle";
import CourseTabs from '../../components/dashboard/CourseTabs';
import Filters from "../../components/common/Filters";

const Courses = () => {

  usePageTitle({ title: 'My Courses' })

  return (
    <>
      <Filters hasSearch={false} />
      <CourseTabs />
    </>
  )
}

Courses.navState = {
  topLevel: 'courses',
  secondary: 'mycourses'
}

export default Courses