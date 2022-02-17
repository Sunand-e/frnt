import { useMutation } from "@apollo/client";
import { DELETE_GROUP } from "../../graphql/mutations/group/DELETE_GROUP";
import { DeleteGroup, DeleteGroupVariables } from "../../graphql/mutations/group/__generated__/DeleteGroup";
import { GroupFragment } from "../../graphql/queries/allQueries";

function useDeleteGroup() {

  const [deleteGroupMutation, deleteGroupResponse] = useMutation<DeleteGroup, DeleteGroupVariables>(DELETE_GROUP)

  const deleteGroup = (id) => {
    deleteGroupMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteGroup: {
          __typename: 'DeleteGroupPayload',
          group: {
            id,
            _deleted: true,
          },
          message: ''
        },
      },
      update(cache, { data: deleteGroup }) {
        // We get a single item.
        const group = cache.readFragment({
          id: `Group:${id}`,
          fragment: GroupFragment,
        });
        // Then, we update it.
        if (group) {
          cache.writeFragment({
            id: `Group:${id}`,
            fragment: GroupFragment,
            data: {
              ...group,
              _deleted: true
            },
          });
        }
      }
    })
  }

      
  return {
    deleteGroup,
  }
}

export default useDeleteGroup