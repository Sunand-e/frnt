
import { useQuery } from "@apollo/client"
import { GET_TAGS, GET_TAGS_FULL } from "../../graphql/queries/tags";

function useGetTagsFull() {

  const { loading, error, data: {tags} = {} } = useQuery(GET_TAGS);

  return { tags, loading, error }
}

export default useGetTagsFull