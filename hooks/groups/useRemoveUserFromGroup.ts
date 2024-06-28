import { useMutation, useQuery } from "@apollo/client"
import { RemoveUserFromGroup, RemoveUserFromGroupVariables } from "../../graphql/mutations/group/__generated__/RemoveUserFromGroup";
import { REMOVE_USER_FROM_GROUP } from "../../graphql/mutations/group/REMOVE_USER_FROM_GROUP";
import { RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables, RemoveUserFromGroupPayload } from "../../graphql/generated";
import { GET_GROUP } from "../../graphql/queries/groups";

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
        onCompleted: cb,
        
        update: (cache, { data: { removeUserFromGroup } }) => {

          cache.updateQuery({
            query: GET_GROUP,
            variables: { id: values.groupId },
          }, data => {
            if(data && data.group) {
              // Filter out the user from the group's user connection
              const filteredUsers = data.group.users.edges.filter(edge => 
                edge.node.id !== values.userId
              );
              // Write the modified group data back to the cache
              return {
                ...data,
                group: {
                  ...data.group,
                  users: {
                    ...data.group.users,
                    edges: filteredUsers,
                  },
                },
              }
            }
          })
        },

        optimisticResponse: {
          removeUserFromGroup: {
            __typename: 'RemoveUserFromGroupPayload',
            membership: {
              __typename: 'GroupMembership',
              user: {
                __typename: 'User',
                id: values.userId,
              },
              group: {
                __typename: 'Group',
                id: values.groupId,
              },
            },
          },
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