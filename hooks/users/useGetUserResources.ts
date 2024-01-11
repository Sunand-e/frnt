
import { useQuery } from "@apollo/client"
import { GET_USER_RESOURCES } from "../../graphql/queries/userDetails";

function useGetUserResources(id=null) {

  const { loading, error, data: {user} = {} } = useQuery(
    GET_USER_RESOURCES,
    {
      variables: id ? { id } : null
    }
  );

  return { 
    resources: user?.resources,
    loading,
    error
  }
}

export default useGetUserResources