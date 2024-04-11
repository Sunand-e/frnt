
import { useMutation } from "@apollo/client";
import { REMOVE_PROVISIONED_CONTENT_FROM_GROUPS } from "../../graphql/mutations/group/REMOVE_PROVISIONED_CONTENT_FROM_GROUPS";
import { AddUsersToGroups, AddUsersToGroupsVariables } from "../../graphql/mutations/group/__generated__/AddUsersToGroups";

function useRemoveProvisionedContentFromGroups() {

  const [removeProvisionedContentFromGroupsMutation, removeProvisionedContentFromGroupsResponse] = useMutation(
    REMOVE_PROVISIONED_CONTENT_FROM_GROUPS
  );

  const removeProvisionedContentFromGroups = (values, cb = null) => {
      removeProvisionedContentFromGroupsMutation({
        variables: {
          ...values
        },
        onCompleted: cb,
      }).catch(res => {
        // TODO: do something if there is an error!!
      })
    }
  
    return {
      groups: removeProvisionedContentFromGroupsResponse?.data?.removeProvisionedContentFromGroups?.groups,
      removeProvisionedContentFromGroups,
    }
}

export default useRemoveProvisionedContentFromGroups