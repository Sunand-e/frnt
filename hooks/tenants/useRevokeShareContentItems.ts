import { useMutation } from "@apollo/client"
import { RevokeShareContentItems, RevokeShareContentItemsVariables } from "../../graphql/mutations/tenant/__generated__/RevokeShareContentItems";
import { REVOKE_SHARE_CONTENT_ITEMS } from "../../graphql/mutations/tenant/REVOKE_SHARE_CONTENT_ITEMS";
import { TENANT_SHARED_ITEMS } from "../../graphql/queries/tenants";


function useRevokeShareContentItems() {

  const [revokeShareContentItemsMutation, revokeShareContentItemsResponse] = useMutation<RevokeShareContentItems, RevokeShareContentItemsVariables>(
    REVOKE_SHARE_CONTENT_ITEMS,
  );

  const revokeShareContentItems = (values: any) => {
    revokeShareContentItemsMutation({
      variables: { ...values },
      refetchQueries: [TENANT_SHARED_ITEMS]
    }).catch(res => {
      // : do something if there is an error!!
    })
  }

  return {
    revokeShareContentItems
  }
}

export default useRevokeShareContentItems
