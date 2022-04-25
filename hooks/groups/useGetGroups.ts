
import { GET_GROUPS } from "../../graphql/queries/groups"
import { useQuery } from "@apollo/client"

function useGetGroups() {

  const { loading, error, data: {groups} = {} } = useQuery(
    GET_GROUPS
  );

  return { groups, loading, error }
}

export default useGetGroups