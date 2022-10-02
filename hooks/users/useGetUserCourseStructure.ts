
import { useQuery } from "@apollo/client"
import { GET_USER_COURSE_STRUCTURE } from "../../graphql/queries/users";

function useGetUserCourseStructure(id=null) {
  
  const { loading, error, data: {user} = {} } = useQuery(
    GET_USER_COURSE_STRUCTURE,
    {
      variables: id ? { id } : null
    }
  );

  return { user, loading, error }
}

export default useGetUserCourseStructure