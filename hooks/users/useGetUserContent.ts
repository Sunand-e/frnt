
import { useQuery } from "@apollo/client"
import { GET_USER_COURSES, GET_USER_RESOURCES, GET_USER_PATHWAYS, GET_USER_CONTENT } from "../../graphql/queries/userDetails";

function useGetUserContent(id=null, type) {

  let query
  if(type === 'course') {
    query = GET_USER_COURSES
  } else if(type === 'resource') {
    query = GET_USER_RESOURCES
  } else if(type === 'pathway') {
    query = GET_USER_PATHWAYS
  } else if(type === 'content') {
    query = GET_USER_CONTENT
  }

  const { loading, error, data: {user} = {} } = useQuery(
    query,
    {
      variables: id ? { id } : null
    }
  );

  return { 
    content: user?.courses || user?.resources || user?.pathways || user?.contentItems,
    loading,
    error
  }
}

export default useGetUserContent