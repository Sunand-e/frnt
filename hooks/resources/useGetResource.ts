import { ResourceFragment, GET_RESOURCE } from "../../graphql/queries/allQueries"
import { useMutation, useQuery } from "@apollo/client"
import cache from "../../graphql/cache"


function useGetResource(id=null) {

  const { loading, error, data: {resource} = {} } = useQuery(
    GET_RESOURCE,
    {
      variables: {
        id
      }
    }
  );

  return {
    resource,
    loading,
    error,
  }
}

export default useGetResource