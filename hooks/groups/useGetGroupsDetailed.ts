
import { useQuery } from "@apollo/client";
import { GET_GROUPS_DETAILED } from "../../graphql/queries/groups";

function useGetGroupsDetailed() {

  const { loading, error, data: {groups} = {} } = useQuery(
    GET_GROUPS_DETAILED,
  );

  return { groups, loading, error }
}

export default useGetGroupsDetailed