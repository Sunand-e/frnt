import { GET_COURSES_BASIC } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";
import { GET_COURSE_USERS, GET_USER_COURSE_LESSONS } from "../../graphql/queries/courses/courseUsers";
import { GetCourseUsers } from "../../graphql/queries/courses/__generated__/GetCourseUsers";

function useGetUserCourseLessons(id) {

  const {loading, error, data } = useQuery<GetCourseUsers>(
    GET_USER_COURSE_LESSONS,
    { variables: { id } }
  );

  const users = data?.course?.users.edges.map(userEdge => {
    const { node, ...courseData } = userEdge;
    return {
      ...node,
      ...courseData
    }
  })
  
  return {
    users,
    loading,
    error
  }
}

export default useGetUserCourseLessons