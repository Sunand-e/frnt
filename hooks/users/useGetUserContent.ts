
import { useQuery } from "@apollo/client"
import { GET_USER_CONTENT } from "../../graphql/queries/users";

function useGetUserContent(id) {
  
  const { loading, error, data: {user} = {} } = useQuery(
    GET_USER_CONTENT,
    {
      variables: {
        id
      }
    }
  );

  return { user, loading, error }
}

export default useGetUserContent