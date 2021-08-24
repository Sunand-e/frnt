import PageTitle from '../../../components/PageTitle';
import CourseEditForm from '../../../components/admin/courses/CourseEditForm'
import { useRouter } from '../../../utils/router'
import { useQuery } from '@apollo/client';
import { GET_COURSE } from '../../../graphql/queries/allQueries';

const AdminCoursesEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()

  const { id } = router.query

  const { loading, error, data: {course} = {} } = useQuery(
    GET_COURSE,
    {
      variables: {
        id
      }
    }
  );


  if(course) {
    return (
      <>
        <PageTitle title={`Edit Course: ${course?.name}`} />
        <CourseEditForm course={course} />
      </>
    )
  } else {
    return (
      <PageTitle title={`Edit Course`} />
    )
  }
}

AdminCoursesEdit.navState = {
  topLevel: 'courses',
  secondary: 'courses'
  }

export default AdminCoursesEdit