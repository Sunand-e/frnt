
import { useQuery } from "@apollo/client"
import { GET_TAGS } from "../../graphql/queries/tags";

function useGetTags() {

  const { loading, error, data: {tags} = {} } = useQuery(GET_TAGS);

  return { tags, loading, error }
}

export default useGetTags