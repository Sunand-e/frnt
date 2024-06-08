
import { useQuery } from "@apollo/client";
import { GET_GROUPS_DETAILED } from "../../graphql/queries/groups";

function useGetGroupsDetailed(shouldFetch=true) {

  const { loading, error, data: {groups} = {} } = useQuery(
    GET_GROUPS_DETAILED,
    {
      skip: !shouldFetch
    }
  );

  return { groups, loading, error }
}

export default useGetGroupsDetailed