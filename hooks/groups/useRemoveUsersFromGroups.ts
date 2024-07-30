import { useMutation } from "@apollo/client"
import { REMOVE_USERS_FROM_GROUPS } from "../../graphql/mutations/group/REMOVE_USERS_FROM_GROUPS";
import { RemoveUsersFromGroupsMutation, RemoveUsersFromGroupsMutationVariables, RemoveUsersFromGroupsPayload } from "../../graphql/generated";
import { GET_GROUP } from "../../graphql/queries/groups";

function useRemoveUsersFromGroups() {

  const [removeUsersFromGroupsMutation, removeUsersFromGroupsResponse] = useMutation<RemoveUsersFromGroupsMutation, RemoveUsersFromGroupsMutationVariables>(
    REMOVE_USERS_FROM_GROUPS
  );

  const removeUsersFromGroups = (values, cb = null) => {
    // const updateUser = ({name=null, contentBlocks=null}) => {
  
      removeUsersFromGroupsMutation({
        variables: {
          ...values
        },
        onCompleted: cb,
        
        update: (cache, { data: { removeUsersFromGroups } }) => {
          values.groupIds.forEach(groupId => {
            cache.updateQuery({
              query: GET_GROUP,
              variables: { id: groupId },
            }, data => {
              if(data && data.group) {
                // Filter out the user from the group's user connection
                const filteredUsers = data.group.users.edges.filter(edge => 
                  !values.userIds.includes(edge.node.id)
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
          });
        },

        optimisticResponse: {
          removeUsersFromGroups: {
            __typename: 'RemoveUsersFromGroupsPayload',
            memberships: values.userIds.flatMap(userId => 
              values.groupIds.map(groupId => ({
                __typename: 'GroupMembership',
                user: {
                  __typename: 'User',
                  id: userId,
                },
                group: {
                  __typename: 'Group',
                  id: groupId,
                },
              }))
            ),
          },
        },
      }).catch(res => {
        // TODO: do something if there is an error!!
      })
    }
  
    return {
      groups: removeUsersFromGroupsResponse?.data?.removeUsersFromGroups?.groups,
      removeUsersFromGroups,
    }
}

export default useRemoveUsersFromGroups