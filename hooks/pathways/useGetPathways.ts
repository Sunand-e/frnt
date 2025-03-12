import { useQuery } from "@apollo/client";
import { GET_PATHWAYS } from "../../graphql/queries/allQueries";
import { GetPathways } from "../../graphql/queries/__generated__/GetPathways";

function useGetPathways() {
  const { loading, error, data} = useQuery<GetPathways>(GET_PATHWAYS);

  return {
    pathways: data?.pathways,
    loading,
    error
  };
}

export default useGetPathways;
