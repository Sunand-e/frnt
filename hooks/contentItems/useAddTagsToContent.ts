import { gql, useMutation } from "@apollo/client"
import { ADD_TAGS_TO_CONTENT } from "../../graphql/mutations/contentItem/ADD_TAGS_TO_CONTENT";
import cache from "../../graphql/cache";
import { AddTagsToContentMutation, AddTagsToContentMutationVariables, ContentTagsFragmentFragment } from "../../graphql/generated";
import { ContentTagsFragment } from "../../graphql/mutations/contentItem/fragments/ContentTagsFragment";

function useAddTagsToContent() {

  const [addTagsToContentMutation, addTagsToContentResponse] = useMutation<AddTagsToContentMutation, AddTagsToContentMutationVariables>(
    ADD_TAGS_TO_CONTENT
  );
  
  const addTagsToContent = (values, cb = null) => {

    const existingCachedContent = values.contentItemIds.reduce((acc, id) => {
      // Fetch the existing user data from the cache
      const cachedContent: ContentTagsFragmentFragment = cache.readFragment({ 
        id: `ContentItem:${id}`,
        fragment: ContentTagsFragment
      });
      // If the content exists, add it to the accumulator
      if (cachedContent) {
        acc.push(cachedContent);
      }
      return acc;
    }, []);

    const updatedContent = existingCachedContent.map(content => {
      // Create new edges for the new content item IDs
      const newTagEdges = values.tagIds.map(tagId => ({
        __typename: 'ContentItemTagEdge',
        contentItemId: content.id,
        node: {
          __typename: 'Tag',
          id: tagId,
        },
      }));

      return {
        ...content,
        tags: {
          ...content.tags,
          edges: [
            ...content.tags.edges,
            ...newTagEdges,
          ]
        }
      };
    });

    addTagsToContentMutation({
      variables: {
        ...values
      },
      optimisticResponse: {
        addTagsToContent: {
          __typename: 'AddTagsToContentPayload',
          contentItems: updatedContent,
          status: 'Added tags to content items',
        },
      },
      onCompleted: cb
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    addTagsToContent,
  }
}

export default useAddTagsToContent