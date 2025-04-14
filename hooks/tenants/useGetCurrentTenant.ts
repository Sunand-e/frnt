
import { useQuery } from "@apollo/client"
import { GET_TENANT } from "../../graphql/queries/tenants";

function useGetCurrentTenant() {

  const { loading, error, data } = useQuery(GET_TENANT);

  return {
    tenant: data?.tenant,
    loading,
    error
  }
}

export default useGetCurrentTenant;
