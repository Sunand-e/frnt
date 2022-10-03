
import { useQuery } from "@apollo/client"
import { GET_CURRENT_USER } from "../../graphql/queries/users";

function useGetCurrentUser(id=null) {

  const { loading, error, data: {user} = {} } = useQuery(GET_CURRENT_USER);

  return { user, loading, error }
}

export default useGetCurrentUser