import { useRouter } from '../../utils/router';
import CoursesReportTable from './course/CoursesReportTable';
import CourseUsersReportTable from './course/CourseUsersReportTable';
import LessonUsersReportTable from './course/LessonUsersReportTable';
import UserCoursesReportTable from './user/UserCoursesReportTable';
import UserLessonsReportTable from './user/UserLessonsReportTable';
import UsersReportTable from './user/UsersReportTable';

const Reporting = () => {

  const router = useRouter()

  const { user, group, course, lesson, category, view } = router.query

  let TableComponent = CoursesReportTable;
  let tableProps = {};
  let title = "Course reports";
  
  if(view === 'users') {
    title = "User reports";
    TableComponent = UsersReportTable;
  }
  
  if(user) {
    if(lesson) {
      title = "Lesson report";
      TableComponent = () => <p>User's lesson statistics for lesson with id: {lesson}</p>
      tableProps = {userId: user, courseId:course};
      // tableProps = {id:lesson};
    } else if(course) {
      title = "User's lessons";
      TableComponent = UserLessonsReportTable
      tableProps = {userId: user, courseId:course};
    } else {
      title = "User's courses";
      TableComponent = UserCoursesReportTable
      tableProps = {id: user};
    }
  } else {
    if(lesson) {
      title = "Lesson users report";
      TableComponent = LessonUsersReportTable
      tableProps = {id: lesson};
    } else if(course) {
      title = "Course users report";
      TableComponent = CourseUsersReportTable
      tableProps = {id: course}
    }
  }


  return (
    <>
      <h3 className="text-main-dark font-semibold">{title}</h3>
      <TableComponent {...tableProps} />
    </>
  )
}

export default Reporting