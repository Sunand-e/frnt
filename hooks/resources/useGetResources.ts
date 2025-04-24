import { useQuery } from "@apollo/client";
import { GET_RESOURCES } from "../../graphql/queries/allQueries";
import { GetResources } from "../../graphql/queries/__generated__/GetResources";

function useGetResources(query = GET_RESOURCES) {
  const { loading, error, data } = useQuery<GetResources>(query);

  return {
    resources: data?.resources,
    loading,
    error
  };
}

export default useGetResources;
