import { GET_USERS } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetUsers } from "../../graphql/queries/__generated__/GetUsers";

function useGetUsers() {

  const { loading, error, data: { users: users } = {} } = useQuery<GetUsers>(GET_USERS);

  return {
    users,
    loading,
    error
  }
}

export default useGetUsers