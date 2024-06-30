
import { useQuery } from "@apollo/client"
import { GET_USER_COURSES, GET_USER_RESOURCES, GET_USER_PATHWAYS } from "../../graphql/queries/userDetails";

function useGetUserContent(id=null, type) {

  let query
  if(type === 'course') {
    query = GET_USER_COURSES
  } else if(type === 'resource') {
    query = GET_USER_RESOURCES
  } else if(type === 'pathway') {
    query = GET_USER_PATHWAYS
  }

  const { loading, error, data: {user} = {} } = useQuery(
    query,
    {
      variables: id ? { id } : null
    }
  );

  return { 
    content: user?.courses || user?.resources || user?.pathways,
    loading,
    error
  }
}

export default useGetUserContent