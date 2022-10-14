
import { useQuery } from "@apollo/client"
import { GET_USER_PATHWAY } from "../../graphql/queries/users";

function useGetUserPathway(id=null) {
  
  const { loading, error, data: {user} = {} } = useQuery(
    GET_USER_PATHWAY,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
      variables: {
        pathwayFilter: {
          id
        },
        courseResourceFilter: {
          parentId: id
        },
      },
      skip: !id
    }
  );

  return { user, loading, error }
}

export default useGetUserPathway