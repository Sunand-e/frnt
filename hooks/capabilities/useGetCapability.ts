
import { useQuery } from "@apollo/client"
import { GET_CAPABILITY } from "../../graphql/queries/capabilities";

function useGetCapability(id) {

  const { loading, error, data: {capability} = {} } = useQuery(
    GET_CAPABILITY,
    {
      variables: { id },
      skip: !id
    }
  );

  return { capability, loading, error }
}

export default useGetCapability