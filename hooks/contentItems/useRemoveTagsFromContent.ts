import { useMutation } from "@apollo/client"
import { gql } from '@apollo/client';
import { REMOVE_TAGS_FROM_CONTENT } from "../../graphql/mutations/contentItem/REMOVE_TAGS_FROM_CONTENT";
import { ContentTagsFragmentFragment, RemoveTagsFromContentMutation, RemoveTagsFromContentMutationVariables } from "../../graphql/generated";
import { ContentTagsFragment } from "../../graphql/mutations/contentItem/fragments/ContentTagsFragment";
import cache from "../../graphql/cache";

function useRemoveTagsFromContent() {

  const [removeTagsFromContentMutation, removeTagsFromContentResponse] = useMutation<RemoveTagsFromContentMutation, RemoveTagsFromContentMutationVariables>(
    REMOVE_TAGS_FROM_CONTENT
  )

  const removeTagsFromContent = (values, cb = null) => {
    
    const existingCachedContent = values.contentItemIds.reduce((acc, id) => {
      // Fetch the existing content data from the cache
      const cachedContent: ContentTagsFragmentFragment = cache.readFragment({ 
        id: `ContentItem:${id}`,
        fragment: ContentTagsFragment
      });
      if (cachedContent) {
        acc.push(cachedContent);
      }
      return acc;
    }, []);

    const updatedContent = existingCachedContent.map(content => {
      // Filter out the tags with the specified tagIds
      const remainingTagEdges = content.tags.edges.filter(tag => !values.tagIds.includes(tag.node.id));

      return {
        ...content,
        tags: {
          ...content.tags,
          edges: remainingTagEdges,
        }
      };
    });

    removeTagsFromContentMutation({
      variables: {
        ...values
      },
 
      optimisticResponse: {
        removeTagsFromContent: {
          __typename: 'RemoveTagsFromContentPayload',
          contentItems: updatedContent,
          status: 'Successfully removed tags from content items',
        }
      },

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