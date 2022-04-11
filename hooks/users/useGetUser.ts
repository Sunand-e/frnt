
import { useQuery } from "@apollo/client"
import { GET_USER } from "../../graphql/queries/users";

function useGetUser(id) {

  const { loading, error, data: {user} = {} } = useQuery(
    GET_USER,
    {
      variables: {
        id
      }
    }
  );

  return { user, loading, error }
}

export default useGetUser