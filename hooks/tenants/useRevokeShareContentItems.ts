import { useMutation } from "@apollo/client"
import { RevokeShareContentItems, RevokeShareContentItemsVariables } from "../../graphql/mutations/tenant/__generated__/RevokeShareContentItems";
import { REVOKE_SHARE_CONTENT_ITEMS } from "../../graphql/mutations/tenant/REVOKE_SHARE_CONTENT_ITEMS";


function useRevokeShareContentItems() {

  const [revokeShareContentItemsMutation, revokeShareContentItemsResponse] = useMutation<RevokeShareContentItems, RevokeShareContentItemsVariables>(
    REVOKE_SHARE_CONTENT_ITEMS,
  );

  const revokeShareContentItems = (values, cb = null) => {
    revokeShareContentItemsMutation({
      variables: { 
        ...values
      }
    }).catch(res => {
      // : do something if there is an error!!
    })
  }

  return {
    revokeShareContentItems
  }
}

export default useRevokeShareContentItems
