
import { GET_GROUPS } from "../../graphql/queries/groups"
import { useQuery } from "@apollo/client"

function useGetGroups(shouldFetch=true) {

  const { loading, error, data: {groups} = {} } = useQuery(
    GET_GROUPS,
    {
      skip: !shouldFetch
    }
  );

  return { groups, loading, error }
}

export default useGetGroups