import { useMutation } from "@apollo/client";
import { group } from "console";
import { DELETE_USER } from "../../graphql/mutations/user/DELETE_USER";
import { DeleteUser, DeleteUserVariables } from "../../graphql/mutations/user/__generated__/DeleteUser";
import { GET_ADMIN_DASHBOARD_DATA } from "../../graphql/queries/misc";
import { GET_USERS, UserFragment } from "../../graphql/queries/users";

function useDeleteUser() {

  const [deleteUserMutation, deleteUserResponse] = useMutation<DeleteUser, DeleteUserVariables>(
    DELETE_USER,
    {
      // refetchQueries: [GET_USERS]
    }
  )

  const deleteUser = (id) => {
    deleteUserMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        deleteUser: {
          __typename: 'DeleteUserPayload',
          user: {
            __typename: 'User',
            id,
            _deleted: true,
          },
        },
      },
      update(cache, { data: deleteUser }) {
        // Set user's _deleted field to true
        const user = cache.modify({
          id: `User:${id}`,
          fields: {
            _deleted: () => true,
          },
        })

        // Update user connection's totalCount field
        cache.modify({
          id: 'ROOT_QUERY',
          fields: {
            users: (existingUsers = {}, { readField }) => {
              const totalCount = readField('totalCount', existingUsers);
              if (typeof totalCount === 'number') {
                return {
                  ...existingUsers,
                  totalCount: totalCount - 1,
                };
              }
              return existingUsers;
            },
          },
        })

        // Update all groups that the user is a member of:

        // - Extract the entire cache
        const cacheData = cache.extract();

        // - Filter the keys to get the group IDs for the deleted user
        const userGroupEdgeKeys = Object.keys(cacheData).filter(
          key => key.startsWith(`UserGroupEdge:${id}:`)
        );

        // - Extract the group IDs from the keys
        const groupIds = userGroupEdgeKeys.map(
          key => key.split(':')[2] // The group ID is after the 2nd colon
        );

        // - Loop through the group IDs and update the totalCount
        groupIds.forEach(groupId => {
          cache.modify({
            id: `Group:${groupId}`,
            fields: {
              users: (existingUsers = {}, { readField }) => {

                const totalCount = readField('totalCount', existingUsers);

                if (typeof totalCount === 'number') {
                  return {
                    ...existingUsers,
                    totalCount: totalCount - 1,
                  };
                }
                return existingUsers;
              },
            },
          });
        });
      }
    })
  }

      
  return {
    deleteUser,
  }
}

export default useDeleteUser