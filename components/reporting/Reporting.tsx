import { useRouter } from 'next/router';
import CoursesReportTable from './course/CoursesReportTable';
import CourseUsersReportTable from './course/CourseUsersReportTable';
import GroupsReportTable from './group/GroupsReportTable';
import UserCoursesReportTable from './user/UserCoursesReportTable';
import UserCourseReportTable from './user/UserCourseReportTable';
import UsersReportTable from './user/UsersReportTable';

const Reporting = () => {

  const router = useRouter()

  const {
    user: userId,
    course: courseId,
    type
  } = router.query

  let TableComponent = CoursesReportTable;
  let tableProps = {};

  if (type === 'user') {
    TableComponent = UsersReportTable;
  }

  if (type === 'group') {
    TableComponent = GroupsReportTable;
  }

  if (userId) {
    if (courseId) {
      TableComponent = UserCourseReportTable
    } else {
      // cOURSE REPORT FOR USER: ''
      TableComponent = UserCoursesReportTable
    }
  } else if (courseId) {
    // User REPORT FOR Course: ''
    TableComponent = CourseUsersReportTable
  }

  return (
    <>
      {TableComponent && <TableComponent {...tableProps} />}
    </>
  )
}

export default Reporting;
