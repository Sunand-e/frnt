import { throwServerError, useMutation } from "@apollo/client"
import { RemoveTagsFromContent, RemoveTagsFromContentVariables } from "../../graphql/mutations/contentItem/__generated__/RemoveTagsFromContent";
import { REMOVE_TAGS_FROM_CONTENT } from "../../graphql/mutations/contentItem/REMOVE_TAGS_FROM_CONTENT";

import { gql } from '@apollo/client';

export const ContentTagsFragment = gql`
  fragment ContentTagsFragment on ContentItem {
    id
    tags {
      edges {
        id
        node {
          id
        }
      }
    }
  }
`

function useRemoveTagsFromContent() {

  const [removeTagsFromContentMutation, removeTagsFromContentResponse] = useMutation<RemoveTagsFromContent, RemoveTagsFromContentVariables>(
    REMOVE_TAGS_FROM_CONTENT
  )

  const removeTagsFromContent = (values, cb = null) => {
    // const updateUser = ({name=null, contentBlocks=null}) => {
    removeTagsFromContentMutation({
      variables: {
        ...values
      },

      // All affected contentItems and their tags are returned in the response, so the cache is automatically update.
      // If we did not receive these in the mutation's response, we would have to use the following:

      // update(cache, result, options) {
      //   for(var content_id of values.contentItemIds) {
      //     cache.updateFragment({ 
      //       id:`ContentItem:${content_id}`,
      //       fragment: ContentTagsFragment,
      //       optimistic: true
      //     }, (data) => {      
      //       console.log(values.tagIds)
      //       const newData = {
      //         ...data,
      //         tags: {
      //           ...data.tags,
      //           edges: data.tags.edges.filter(tagEdge => {
      //             !values.tagIds.some(id => id !== tagEdge.node.id)
      //           })
      //         }
      //       }
      //       return newData
      //     })
      //   }
      // },

      // optimisticResponse: {

      // }
      onCompleted: cb
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    removeTagsFromContent,
  }
}

export default useRemoveTagsFromContent