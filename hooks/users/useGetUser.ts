
import { useQuery } from "@apollo/client"
import { GET_USER } from "../../graphql/queries/users";

function useGetUser(id=null) {

  const { loading, error, data: {user} = {} } = useQuery(
    GET_USER,
    {
      variables: id ? { id } : null
    }
  );

  return { user, loading, error }
}

export default useGetUser