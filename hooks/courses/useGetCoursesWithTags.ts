
import { useQuery } from "@apollo/client"
import { GET_COURSES } from "../../graphql/queries/newQueries/GET_COURSES";
import { GET_COURSES_WITH_TAGS } from "../../graphql/queries/newQueries/GET_COURSES_WITH_TAGS";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";

function useGetCoursesWithTags() {

  const {loading, error, data: { courses: courses} = {} } = useQuery<GetCourses>(
    GET_COURSES_WITH_TAGS
  );

  return {
    courses,
    loading,
    error
  }
}

export default useGetCoursesWithTags