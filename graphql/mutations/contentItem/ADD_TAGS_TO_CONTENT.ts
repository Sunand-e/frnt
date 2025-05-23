import { gql } from '@apollo/client';

export const ADD_TAGS_TO_CONTENT = gql`
  mutation AddTagsToContent(
    $tagIds: [ID!]!,
    $contentItemIds: [ID!]!
  ) {
    addTagsToContent(
      tagIds: $tagIds,
      contentItemIds: $contentItemIds,
    ) {
      contentItems {
        id
        tags {
          edges {
            id
            contentItemId
            order
            node {
              id
            }
          }
        }
      }
      status
    }
  }
`;