import { useMutation } from "@apollo/client";
import { DELETE_GROUP } from "../../graphql/mutations/group/DELETE_GROUP";
import { DeleteGroup, DeleteGroupVariables } from "../../graphql/mutations/group/__generated__/DeleteGroup";

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
        cache.modify({
          id: `Group:${id}`,
          fields: {
            _deleted: (cachedValue) => true
          },
        });
      }
    })
  }

      
  return {
    deleteGroup,
  }
}

export default useDeleteGroup