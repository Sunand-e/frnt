import { useMutation } from "@apollo/client";
import { DELETE_TAG } from "../../graphql/mutations/tag/DELETE_TAG";
import { DeleteTag, DeleteTagVariables } from "../../graphql/mutations/tag/__generated__/DeleteTag";
import { GET_TAGS, TagFragment } from "../../graphql/queries/tags";

function useDeleteTag() {

  const [deleteTagMutation, deleteTagResponse] = useMutation<DeleteTag, DeleteTagVariables>(
    DELETE_TAG,
    {
      refetchQueries: [GET_TAGS]
    }
  )

  const deleteTag = (id) => {
    deleteTagMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteTag: {
          __typename: 'DeleteTagPayload',
          tag: {
            id,
            _deleted: true,
          },
          message: ''
        },
      },
      
      update(cache, { data: deleteTag }) {
        // We get a single item.
        const tag = cache.readFragment({
          id: `Tag:${id}`,
          fragment: TagFragment,
        });
        // Then, we update it.
        if (tag) {
          cache.writeFragment({
            id: `Tag:${id}`,
            fragment: TagFragment,
            data: {
              ...tag,
              _deleted: true
            },
          });
        }
      }
      // update(cache, { data: deleteTag }) {
      //   // We get a single item.
      //   const tag = cache.readFragment({
      //     id: `Tag:${id}`,
      //     fragment: TagFragment,
      //   });
      //   // Then, we update it.
      //   if (tag) {
      //     cache.writeFragment({
      //       id: `Tag:${id}`,
      //       fragment: TagFragment,
      //       data: {
      //         ...tag,
      //         _deleted: true
      //       },
      //     });
      //   }
      // }
    })
  }

      
  return {
    deleteTag,
  }
}

export default useDeleteTag