import { useMutation, useQuery } from "@apollo/client"
import { RemoveUserFromGroup, RemoveUserFromGroupVariables } from "../../graphql/mutations/group/__generated__/RemoveUserFromGroup";
import { REMOVE_USER_FROM_GROUP } from "../../graphql/mutations/group/REMOVE_USER_FROM_GROUP";
import { RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables, RemoveUserFromGroupPayload } from "../../graphql/generated";

function useRemoveUserFromGroup() {

  const [removeUserFromGroupMutation, removeUserFromGroupResponse] = useMutation<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>(
    REMOVE_USER_FROM_GROUP
  );


  const removeUserFromGroup = (values, cb = null) => {
    // const updateUser = ({name=null, contentBlocks=null}) => {
  
      removeUserFromGroupMutation({
        variables: {
          ...values
        },
        refetchQueries: ['GetUser'],
        onCompleted: cb,
        update: (cache, { data: { removeUserFromGroup } }) => {
          // Remove the user's groups from the connection edge list.
          const userId = removeUserFromGroup.membership.user.id
          const groupId = removeUserFromGroup.membership.group.id
          // Generate the unique key for the edge.
          const edgeId = `UserGroupEdge:${userId}:${groupId}`;  
          // Remove the edge from the cache.
          cache.evict({ id: edgeId });
    
          // Garbage collect any unreachable objects from the cache.
          cache.gc();
        },
      }).catch(res => {
        // TODO: do something if there is an error!!
      })
    }
  
    return {
      groups: removeUserFromGroupResponse?.data?.removeUserFromGroup?.groups,
      removeUserFromGroup,
    }
}

export default useRemoveUserFromGroup