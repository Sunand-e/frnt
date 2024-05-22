
import { useQuery } from "@apollo/client"
import { GET_PATHWAYS, GET_RESOURCES } from "../../graphql/queries/allQueries";
import { GET_COURSES } from "../../graphql/queries/courses/courses";

function useGetContent(type) {

  let query
  if(type === 'course') {
    query = GET_COURSES
  } else if(type === 'resource') {
    query = GET_RESOURCES
  } else if(type === 'pathway') {
    query = GET_PATHWAYS
  }

  // const {loading, error, data: { courses: courses} = {} } = useQuery<GetCourses>(
  const {loading, error, data } = useQuery(
    query
  );

  return {
    content: data?.courses || data?.resources || data?.pathways,
    loading,
    error
  }
}

export default useGetContent