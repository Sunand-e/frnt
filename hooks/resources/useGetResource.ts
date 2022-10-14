import { LibraryItemFragment, GET_LIBRARY_ITEM } from "../../graphql/queries/allQueries"
import { useMutation, useQuery } from "@apollo/client"
import cache from "../../graphql/cache"


function useGetResource(id=null) {

  const { loading, error, data: {libraryItem} = {} } = useQuery(
    GET_LIBRARY_ITEM,
    {
      variables: {
        id
      }
    }
  );

  return {
    libraryItem,
    loading,
    error,
  }
}

export default useGetResource