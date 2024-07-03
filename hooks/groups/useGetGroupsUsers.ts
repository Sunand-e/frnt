
import { GET_GROUPS_USERS } from "../../graphql/queries/groups"
import { useQuery } from "@apollo/client"

function useGetGroupsUsers(shouldFetch=true) {

  const { loading, error, data: {groups} = {} } = useQuery(
    GET_GROUPS_USERS,
    {
      skip: !shouldFetch
    }
  );

  return { groups, loading, error }
}

export default useGetGroupsUsers