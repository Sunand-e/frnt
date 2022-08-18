import { GET_LIBRARY_ITEMS } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetLibraryItems } from "../../graphql/queries/__generated__/GetLibraryItems";

function useGetResources() {

  const {loading, error, data: { libraryItems: libraryItems} = {} } = useQuery<GetLibraryItems>(
    GET_LIBRARY_ITEMS
  );

  return {
    resources: libraryItems,
    loading,
    error
  }
}

export default useGetResources