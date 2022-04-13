import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../graphql/mutations/user/DELETE_USER";
import { DeleteUser, DeleteUserVariables } from "../../graphql/mutations/user/__generated__/DeleteUser";
import { GET_USERS, UserFragment } from "../../graphql/queries/users";

function useDeleteUser() {

  const [deleteUserMutation, deleteUserResponse] = useMutation<DeleteUser, DeleteUserVariables>(
    DELETE_USER,
    {
      refetchQueries: [GET_USERS]
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
      // update(cache, { data: deleteUser }) {
      //   // We get a single item.
      //   const user = cache.readFragment({
      //     id: `User:${id}`,
      //     fragment: UserFragment,
      //   });
      //   // Then, we update it.
      //   if (user) {
      //     cache.writeFragment({
      //       id: `User:${id}`,
      //       fragment: UserFragment,
      //       data: {
      //         ...user,
      //         _deleted: true
      //       },
      //     });
      //   }
      // }
    })
  }

      
  return {
    deleteUser,
  }
}

export default useDeleteUser