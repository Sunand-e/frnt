import { useRouter } from '../../utils/router';
import CoursesReportTable from './course/CoursesReportTable';
import CourseUsersReportTable from './course/CourseUsersReportTable';
import LessonUsersReportTable from './course/LessonUsersReportTable';
import UserCoursesReportTable from './user/UserCoursesReportTable';
import UserLessonsReportTable from './user/UserLessonsReportTable';
import UsersReportTable from './user/UsersReportTable';

const Reporting = () => {

  const router = useRouter()

  const { 
    user: userId, 
    group: groupId, 
    course: courseId, 
    lesson: lessonId, 
    category: categoryId, 
    view } = router.query

  let title = "Course reports";
  let TableComponent = CoursesReportTable;
  let tableProps = {};
  
  if(view === 'users') {
    TableComponent = UsersReportTable;
  }
  
  if(userId) {
    if(lessonId) {
      title = "Lesson report";
      TableComponent = () => <p>User's lesson statistics for lesson with id: {lessonId}</p>
      tableProps = {userId, courseId};
    } else if(courseId) {
      TableComponent = UserLessonsReportTable
      tableProps = {userId, courseId};
    } else {
      TableComponent = UserCoursesReportTable
      tableProps = {id: userId};
    }
  } else {
    if(lessonId) {
      TableComponent = LessonUsersReportTable
      tableProps = {id: lessonId};
    } else if(courseId) {
      TableComponent = CourseUsersReportTable
      tableProps = {id: courseId}
    }
  }


  return (
    <>
      <TableComponent {...tableProps} />
    </>
  )
}

export default Reporting
