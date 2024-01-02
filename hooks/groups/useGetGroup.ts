
import { GET_GROUP } from "../../graphql/queries/groups"
import { useQuery } from "@apollo/client"

function useGetGroup(id) {

  const { loading, error, data: {group} = {} } = useQuery(
    GET_GROUP,
    {
      variables: { id },
      skip: !id
    }
  );

  return { group, loading, error }
}

export default useGetGroup