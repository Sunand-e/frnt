import { useMutation } from "@apollo/client"
import { ContentItemTagEdge, Tag } from "../../graphql/generated"
import { REORDER_TAG_CONTENT } from "../../graphql/mutations/tag/REORDER_TAG_CONTENT"
import { ContentItemTagEdgeFragment } from "../../graphql/queries/allQueries"


const getContentTagEdge = (contentEdge, tagId) => {
  return contentEdge.node.tags.edges.find(({node}) => node.id === tagId)
}

const useReorderTagContent = () => {

  const [reorderTagContentMutation, reorderTagContentMutationResponse] = useMutation(
    REORDER_TAG_CONTENT
  ) 

  const reorderTagContent = (
    tagId: string,
    contentItemId: string,
    newOrder: number,
    contentItemTagEdgeArray: ContentItemTagEdge[],
  ) => {

    reorderTagContentMutation({
      variables: {
        tagId,
        contentItemId,
        order: newOrder,
      },

      update(cache, response) {
        for (let contentEdge of contentItemTagEdgeArray) {
          const contentTagEdge = getContentTagEdge(contentEdge, tagId)
          let order: number
          if(contentTagEdge.contentItemId === contentItemId) {
            order = newOrder
          } else if(contentTagEdge.order >= newOrder) {
            order = contentTagEdge.order + 1
          } else {
            continue
          }
          cache.updateFragment({ 
            id:`ContentItemTagEdge:${contentTagEdge.contentItemId}:${tagId}`,
            fragment: ContentItemTagEdgeFragment,
            optimistic: true
          }, (data) => {
            const newData = {
              ...data,
              order
            }
            return newData
          })
        }
      },
      optimisticResponse: {
        reorderContentItemsWithinTags: {
          __typename: "ReorderContentWithinTagsPayload",
          tagAttachment: {
            order: newOrder,
            tag: {
              id: tagId
            }
          }
        }
      }
    })
  };

  return {
    reorderTagContent,
    reorderTagContentMutationResponse
  };
}

export default useReorderTagContent;