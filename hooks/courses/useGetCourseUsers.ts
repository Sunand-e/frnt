import { GET_COURSES_BASIC } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";
import { GET_COURSE_USERS } from "../../graphql/queries/courses/courseUsers";
import { GetCourseUsers } from "../../graphql/queries/courses/__generated__/GetCourseUsers";

function useGetCourseUsers(id) {

  const {loading, error, data } = useQuery<GetCourseUsers>(
    GET_COURSE_USERS,
    {
      variables: {
        id
      }
    }
  );

  const users = data?.course?.users.edges.map(userEdge => {
    const { node, ...courseData } = userEdge;
    return {
      ...node,
      ...courseData
    }
  })
  const course = data?.course
  
  return {
    course,
    users,
    loading,
    error
  }
}

export default useGetCourseUsers