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
  let title = "Course reports";
  
  if(view === 'users') {
    title = "User reports";
    TableComponent = UsersTable;
  }
  
  if(user) {
    if(lesson) {
      title = "Lesson report";
      TableComponent = () => <p>User's lesson statistics for lesson with id: {lesson}</p>
      tableProps = {userId: user, courseId:course};
      // tableProps = {id:lesson};
    } else if(course) {
      title = "User's lessons";
      TableComponent = UserLessonsTable
      tableProps = {userId: user, courseId:course};
    } else {
      title = "User's courses'";
      TableComponent = UserCoursesTable
      tableProps = {id: user};
    }
  } else {
    if(lesson) {
      title = "Lesson users report";
      TableComponent = LessonUsersTable
      tableProps = {id: lesson};
    } else if(course) {
      title = "Course users report";
      TableComponent = CourseUsersTable
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