import { useRouter } from '../../utils/router';
import CoursesTable from './course/CoursesTable';
import CourseUsersTable from './course/CourseUsersTable';
import LessonUsersTable from './course/LessonUsersTable';
import UserCoursesTable from './user/UserCoursesTable';
import UserLessonsTable from './user/UserLessonsTable';
import UsersTable from './user/UsersTable';

const Reporting = () => {

  const router = useRouter()

  const { user, group, course, lesson, category, view } = router.query

  let TableComponent = CoursesTable;
  let tableProps = {};
  
  if(view === 'users') {
    TableComponent = UsersTable;
  }
  
  if(user) {
    if(lesson) {
      TableComponent = () => <p>User's lesson statistics for lesson with id: {id}</p>
      // tableProps = {id:lesson};
    } else if(course) {
      TableComponent = UserLessonsTable
      tableProps = {userId: user, courseId:course};
    } else {
      TableComponent = UserCoursesTable
      tableProps = {id: user};
    }
  } else {
    if(lesson) {
      TableComponent = LessonUsersTable
      tableProps = {id: lesson};
    } else if(course) {
      TableComponent = CourseUsersTable
      tableProps = {id: course}
    }
  }


  return (
    <>
      <TableComponent {...tableProps} />
    </>
  )
}

export default Reporting