import { GET_RESOURCES } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetResources } from "../../graphql/queries/__generated__/GetResources";

function useGetResources() {

  const {loading, error, data: { resources: resources} = {} } = useQuery<GetResources>(
    GET_RESOURCES
  );

  return {
    resources: resources,
    loading,
    error
  }
}

export default useGetResources