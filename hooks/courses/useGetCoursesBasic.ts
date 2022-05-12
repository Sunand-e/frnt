import { GET_COURSES_BASIC } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";

function useGetCoursesBasic() {

  const {loading, error, data: { courses: courses} = {} } = useQuery<GetCourses>(
    GET_COURSES_BASIC
  );

  return {
    courses,
    loading,
    error
  }
}

export default useGetCoursesBasic