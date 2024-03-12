
import { useMutation } from "@apollo/client";
import { PROVIDE_CONTENT_TO_GROUPS } from "../../graphql/mutations/group/PROVIDE_CONTENT_TO_GROUPS";
import { REMOVE_PROVIDED_CONTENT_FROM_GROUP } from "../../graphql/mutations/group/REMOVE_PROVIDED_CONTENT_FROM_GROUP";
import { AddUsersToGroups, AddUsersToGroupsVariables } from "../../graphql/mutations/group/__generated__/AddUsersToGroups";

function useRemoveProvidedContentFromGroup() {

  const [removeProvidedContentFromGroupMutation, removeProvidedContentFromGroupResponse] = useMutation<AddUsersToGroups, AddUsersToGroupsVariables>(
    REMOVE_PROVIDED_CONTENT_FROM_GROUP
  );

  const removeProvidedContentFromGroup = (values, cb = null) => {
      removeProvidedContentFromGroupMutation({
        variables: {
          ...values
        },
        onCompleted: cb,
      }).catch(res => {
        // TODO: do something if there is an error!!
      })
    }
  
    return {
      groups: removeProvidedContentFromGroupResponse?.data?.removeProvidedContentFromGroup?.groups,
      removeProvidedContentFromGroup,
    }
}

export default useRemoveProvidedContentFromGroup