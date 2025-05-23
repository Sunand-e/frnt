
import { useQuery } from "@apollo/client"
import { GET_TENANT } from "../../graphql/queries/tenants";

function useGetTenant(id=null) {

  const { loading, error, data: {tenant} = {} } = useQuery(
    GET_TENANT,
    {
      variables: {id},
      skip: !id
    }
  );

  return { tenant, loading, error }
}

export default useGetTenant
