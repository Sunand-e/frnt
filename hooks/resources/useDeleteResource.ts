import { useMutation } from "@apollo/client";
import { DELETE_RESOURCE } from "../../graphql/mutations/resource/DELETE_RESOURCE";
import { DeleteResource } from "../../graphql/mutations/resource/__generated__/DeleteResource";
import { ResourceFragment } from "../../graphql/queries/allQueries";


const useDeleteResource = () => {

  const [deleteResourceMutation, { data: deletedData }] = useMutation<DeleteResource>(DELETE_RESOURCE);

  const deleteResource = (id) => {

    deleteResourceMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        // __typename: 'Mutation',
        deleteResource: {
          __typename: 'DeleteContentItemPayload',
          contentItem: {
            id,
            __typename: 'ContentItem',
            _deleted: true,
          },
          message: ''
        },
      },

      update(cache, { data: deleteResource }) {
        // We get a single item.
        const resource = cache.readFragment({
          id: `ContentItem:${id}`,
          fragment: ResourceFragment,
          fragmentName: 'ResourceFragment',
        });
        // Then, we update it.
        if (resource) {
          cache.writeFragment({
            id: `ContentItem:${id}`,
            fragment: ResourceFragment,
            fragmentName: 'ResourceFragment',
            data: {
              ...resource,
              _deleted: true
            },
          });
        }
      }
    })
  }

  return {
    deleteResource: deleteResource
  }
}

export default useDeleteResource