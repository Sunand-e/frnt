import { GET_TENANTS } from "../../graphql/queries/tenants"
import { useQuery } from "@apollo/client"
import { GetTenants } from "../../graphql/queries/__generated__/GetTenants";

function useGetTenants() {

    const { loading, error, data: { tenants: tenants } = {} } = useQuery<GetTenants>(GET_TENANTS);

    return {
        tenants,
        loading,
        error
    }
}

export default useGetTenants
