import { GET_COURSES } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";

function useGetCourses() {

  const {loading, error, data: { courses: courses} = {} } = useQuery<GetCourses>(
    GET_COURSES
  );

  return {
    courses,
    loading,
    error
  }
}

export default useGetCourses