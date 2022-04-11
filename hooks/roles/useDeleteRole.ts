import { useMutation } from "@apollo/client";
import { DELETE_ROLE } from "../../graphql/mutations/role/DELETE_ROLE";
import { DeleteRole, DeleteRoleVariables } from "../../graphql/mutations/role/__generated__/DeleteRole";
import { GET_ROLES, RoleFragment } from "../../graphql/queries/roles";

function useDeleteRole() {

  const [deleteRoleMutation, deleteRoleResponse] = useMutation<DeleteRole, DeleteRoleVariables>(
    DELETE_ROLE,
    {
      refetchQueries: [GET_ROLES]
    }
  )

  const deleteRole = (id) => {
    deleteRoleMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteRole: {
          __typename: 'DeleteRolePayload',
          role: {
            id,
            _deleted: true,
          },
          message: ''
        },
      },
      // update(cache, { data: deleteRole }) {
      //   // We get a single item.
      //   const role = cache.readFragment({
      //     id: `Role:${id}`,
      //     fragment: RoleFragment,
      //   });
      //   // Then, we update it.
      //   if (role) {
      //     cache.writeFragment({
      //       id: `Role:${id}`,
      //       fragment: RoleFragment,
      //       data: {
      //         ...role,
      //         _deleted: true
      //       },
      //     });
      //   }
      // }
    })
  }

      
  return {
    deleteRole,
  }
}

export default useDeleteRole