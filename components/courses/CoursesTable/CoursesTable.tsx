import useGetCourses from '../../../hooks/courses/useGetCourses';
import CourseActionsMenu from './CourseActionsMenu';
import ContentTable from '../../common/tables/ContentTable';
import { contentTypes } from '../../common/contentTypes';

const CoursesTable = () => {

  const { courses, loading, error, reLoad } = useGetCourses({ pagination: true });
  const type = contentTypes['course']

  return (
    <ContentTable content={courses} type={type} loading={loading} error={error} ActionsMenuComponent={CourseActionsMenu} remote={true} reLoad={reLoad} />
  )
}

export default CoursesTable
