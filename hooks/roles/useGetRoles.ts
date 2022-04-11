
import { useQuery } from "@apollo/client"
import { GET_ROLES } from "../../graphql/queries/roles";

function useGetRoles() {

  const { loading, error, data: {roles} = {} } = useQuery(GET_ROLES);

  return { roles, loading, error }
}

export default useGetRoles