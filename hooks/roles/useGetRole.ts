
import { useQuery } from "@apollo/client"
import { GET_ROLE } from "../../graphql/queries/roles";

function useGetRole(id) {

  const { loading, error, data: {role} = {} } = useQuery(
    GET_ROLE,
    {
      variables: { id },
      skip: !id
    }
  );

  return { role, loading, error }
}

export default useGetRole