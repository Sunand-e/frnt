
import { useQuery } from "@apollo/client"
import { GET_USER_COURSES } from "../../graphql/queries/userDetails";

function useGetUserCourses(id=null) {

  const { loading, error, data: {user} = {} } = useQuery(
    GET_USER_COURSES,
    {
      variables: id ? { id } : null
    }
  );

  return { 
    courses: user?.courses,
    loading,
    error
  }
}

export default useGetUserCourses