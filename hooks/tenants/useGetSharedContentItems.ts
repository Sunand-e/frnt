import { useMutation, useQuery } from "@apollo/client"
import { GetTenantSharedItems, GetTenantSharedItemsVariables } from "../../graphql/queries/__generated__/GetTenantSharedItems";
import { TENANT_SHARED_ITEMS } from "../../graphql/queries/tenants";


function useGetSharedContentItems(tenant_id: string) {

  const variables = {
    where: { sharedWith: tenant_id }
  }

  const { loading, error, data } = useQuery<GetTenantSharedItems, GetTenantSharedItemsVariables>(
    TENANT_SHARED_ITEMS,
    {
      variables: variables,
      notifyOnNetworkStatusChange: true
    }
  );

  return {
    sharedContentItems: data,
    loading
  }
}

export default useGetSharedContentItems
