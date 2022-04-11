
import { useQuery } from "@apollo/client"
import { GET_CAPABILITIES } from "../../graphql/queries/capabilities";

function useGetCapabilities() {

  const { loading, error, data: {capabilities} = {} } = useQuery(GET_CAPABILITIES);

  return { capabilities, loading, error }
}

export default useGetCapabilities