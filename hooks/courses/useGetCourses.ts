
import { useQuery } from "@apollo/client"
import { GET_COURSES } from "../../graphql/queries/courses/courses";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";

function useGetCourses() {

  // const {loading, error, data: { courses: courses} = {} } = useQuery<GetCourses>(
  const {loading, error, data } = useQuery<GetCourses>(
    GET_COURSES
  );

  return {
    courses: data?.courses,
    loading,
    error
  }
}

export default useGetCourses