import { GET_USERS } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetUsers } from "../../graphql/queries/__generated__/GetUsers";

function useGetUsers() {

  const { loading, error, data: { users: users } = {}, refetch } = useQuery<GetUsers>(GET_USERS);

  return {
    users,
    loading,
    error,
    refetchUsers: refetch
  }
}

export default useGetUsers