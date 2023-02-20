
import { useQuery } from "@apollo/client"
import { GET_USER_PATHWAYS } from "../../graphql/queries/users";

function useGetUserPathways(id=null) {

  const { loading, error, data: {user} = {} } = useQuery(
    GET_USER_PATHWAYS,
    {
      variables: id ? { id } : null
    }
  );

  return { 
    pathways: user?.pathways,
    loading,
    error
  }
}

export default useGetUserPathways