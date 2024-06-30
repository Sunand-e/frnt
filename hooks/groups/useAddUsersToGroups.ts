
import { useMutation } from "@apollo/client";
import cache from "../../graphql/cache";
import { AddUsersToGroupsMutation, AddUsersToGroupsMutationVariables } from "../../graphql/generated";
import { ADD_USERS_TO_GROUPS } from "../../graphql/mutations/group/ADD_USERS_TO_GROUPS";
import { GET_GROUP } from "../../graphql/queries/groups";
import { GET_USER } from "../../graphql/queries/userDetails";

function useAddUsersToGroups() {

  const [addUsersToGroupsMutation, addUsersToGroupsResponse] = useMutation<AddUsersToGroupsMutation, AddUsersToGroupsMutationVariables>(
    ADD_USERS_TO_GROUPS,
    {
      update: (cache, { data: { addUsersToGroups } }) => {
      },
    }
  );

  const addUsersToGroups = (values, cb = null) => {

      const existingCachedGroups = values.groupIds.reduce((acc, groupId) => {
        // Fetch the existing group data from the cache
        const cachedGroupData = cache.readQuery({ query: GET_GROUP, variables: { id: groupId } });
        const group = cachedGroupData?.group;
        // If the group exists, add it to the accumulator
        if (group) {
          acc.push(group);
        }
        return acc;
      }, []);

    // Assuming values.userIds contains the new content item IDs to be assigned
    // and existingCachedGroups is an array of groups with their current assignedContents

    const updatedGroups = existingCachedGroups.map(group => {
      // Create new edges for the new content item IDs
      const newUserEdges = values.userIds.map(userId => ({
        __typename: 'GroupUserEdge',
        groupId: group.id,
        userId,
        node: {
          __typename: 'User',
          id: userId,
          // fullName: 'New User',
        },
        roles: [
          {
            __typename: 'Role',
            id: values.roleId,
          },
        ],
      }));

      // Combine existing assignedContents with new content item edges
      // This assumes that group.assignedContents is an array of edges

      // Return the updated group with new assignedContents
      return {
        ...group,
        users: {
          ...group.users,
          edges: [
            ...group.users.edges,
            ...newUserEdges,
          ]
        }
      };
    });



    addUsersToGroupsMutation({
      variables: {
        ...values
      },
      optimisticResponse: {
        addUsersToGroups: {
          __typename: 'AddUsersToGroupsPayload',
          groups: updatedGroups,
          users: values.userIds.map(userId => ({
            __typename: 'User',
            id: userId,
            groups: {
              __typename: 'UserGroupConnection',
              // totalCount: 1, // This is optimistic, adjust according to your logic
              edges: values.groupIds.map(groupId => ({
                __typename: 'UserGroupEdge',
                groupId: groupId,
                userId: userId,
                node: {
                  __typename: 'Group',
                  id: groupId,
                },
                roles: [
                  {
                    __typename: 'Role',
                    id: values.roleId,
                  },
                ],
              })),
            },
          })),
        },
      },
      onCompleted: cb
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    groups: addUsersToGroupsResponse?.data?.addUsersToGroups?.groups,
    addUsersToGroups,
  }
}

export default useAddUsersToGroups