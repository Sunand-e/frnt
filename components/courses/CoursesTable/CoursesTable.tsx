import useGetCourses from '../../../hooks/courses/useGetCourses';
import CourseActionsMenu from './CourseActionsMenu';
import ContentTable from '../../common/tables/ContentTable';
import { contentTypes } from '../../common/contentTypes';

const CoursesTable = () => {

  const { loading, error, courses } = useGetCourses()
  const type = contentTypes['course']

  return (
    <ContentTable content={courses} type={type} loading={loading} error={error} ActionsMenuComponent={CourseActionsMenu} />
  )
}

export default CoursesTable
