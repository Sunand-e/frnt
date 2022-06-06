
import { useQuery } from "@apollo/client"
import { GET_USER_CONTENT } from "../../graphql/queries/users";

function useGetUserContent(id=null) {
  
  const { loading, error, data: {user} = {} } = useQuery(
    GET_USER_CONTENT,
    {
      variables: id ? { id } : null
    }
  );

  return { user, loading, error }
}

export default useGetUserContent