import { useMutation } from "@apollo/client"
import { ShareContentItems, ShareContentItemsVariables } from "../../graphql/mutations/tenant/__generated__/ShareContentItems";
import { SHARE_CONTENT_ITEMS } from "../../graphql/mutations/tenant/SHARE_CONTENT_ITEMS";
import { TENANT_SHARED_ITEMS } from "../../graphql/queries/tenants";


function useShareContentItems() {

  const [shareContentItemsMutation, shareContentItemsResponse] = useMutation<ShareContentItems, ShareContentItemsVariables>(
    SHARE_CONTENT_ITEMS,
  );

  const shareContentItems = (values: any) => {
    shareContentItemsMutation({
      variables: { ...values },
      refetchQueries: [TENANT_SHARED_ITEMS]
    }).catch(res => {
      // : do something if there is an error!!
    })
  }

  return {
    shareContentItems
  }
}

export default useShareContentItems
