import { GET_PATHWAYS } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetPathways } from "../../graphql/queries/__generated__/GetPathways";

function useGetPathways() {

  const {loading, error, data: { pathways: pathways} = {} } = useQuery<GetPathways>(
    GET_PATHWAYS
  );

  return {
    pathways,
    loading,
    error
  }
}

export default useGetPathways