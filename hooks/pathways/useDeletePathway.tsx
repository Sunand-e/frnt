import { useMutation } from "@apollo/client";
import { DELETE_PATHWAY } from "../../graphql/mutations/pathway/DELETE_PATHWAY";
import { DeletePathway, DeletePathwayVariables } from "../../graphql/mutations/pathway/__generated__/DeletePathway";
import { PathwayFragment } from "../../graphql/queries/allQueries";

function useDeletePathway() {

  const [deletePathwayMutation, deletePathwayResponse] = useMutation<DeletePathway, DeletePathwayVariables>(DELETE_PATHWAY)

  const deletePathway = (id) => {
    deletePathwayMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        deletePathway: {
          __typename: 'DeleteContentItemPayload',
          contentItem: {
            id,
            __typename: 'ContentItem',
            _deleted: true,
          },
          message: ''
        },
      },

      update(cache, { data: deletePathway }) {
        // We get a single item.
        const pathway = cache.readFragment({
          id: `ContentItem:${id}`,
          fragment: PathwayFragment,
          fragmentName: 'PathwayFragment',
        });
        // Then, we update it.
        if (pathway) {
          cache.writeFragment({
            id: `ContentItem:${id}`,
            fragment: PathwayFragment,
            fragmentName: 'PathwayFragment',
            data: {
              ...pathway,
              _deleted: true
            },
          });
        }
      }
    })
  }
      
  return {
    deletePathway,
  }
}

export default useDeletePathway