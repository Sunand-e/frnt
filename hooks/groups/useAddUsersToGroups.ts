import { useMutation } from "@apollo/client";
import { AddUsersToGroupsMutation, AddUsersToGroupsMutationVariables } from "../../graphql/generated";
import { ADD_USERS_TO_GROUPS } from "../../graphql/mutations/group/ADD_USERS_TO_GROUPS";

function useAddUsersToGroups() {
  const [addUsersToGroupsMutation, addUsersToGroupsResponse] = useMutation<AddUsersToGroupsMutation, AddUsersToGroupsMutationVariables>(
    ADD_USERS_TO_GROUPS,
    {
      update: (cache, { data: { addUsersToGroups } }) => {
        if (!addUsersToGroups) return;

        // Update each group in the cache
        addUsersToGroups.groups.forEach(group => {
          cache.modify({
            id: cache.identify(group),
            fields: {
              users(existingUsers = { edges: [] }) {
                return {
                  ...existingUsers,
                  edges: [...existingUsers.edges, ...group.users.edges],
                };
              },
            },
          });
        });

        // Update each user in the cache
        addUsersToGroups.users.forEach(user => {
          cache.modify({
            id: cache.identify(user),
            fields: {
              groups(existingGroups = { edges: [] }) {
                return {
                  ...existingGroups,
                  edges: [...existingGroups.edges, ...user.groups.edges],
                };
              },
            },
          });
        });
      },
    }
  );

  const addUsersToGroups = (values, cb = null) => {
    addUsersToGroupsMutation({
      variables: {
        ...values
      },
      onCompleted: cb,
    }).catch(err => {
      console.error("Error adding users to groups:", err);
    });
  };

  return {
    groups: addUsersToGroupsResponse?.data?.addUsersToGroups?.groups,
    addUsersToGroups,
  };
}

export default useAddUsersToGroups;
