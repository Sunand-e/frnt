
import { useQuery } from "@apollo/client"
import { GET_TAG } from "../../graphql/queries/tags";

function useGetTag(id) {

  const { loading, error, data: {tag} = {} } = useQuery(
    GET_TAG,
    {
      variables: { id },
      skip: !id
    }
  );

  return { tag, loading, error }
}

export default useGetTag