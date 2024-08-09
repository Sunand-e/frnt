import { gql } from '@apollo/client';

export const REMOVE_TAGS_FROM_CONTENT = gql`
  mutation RemoveTagsFromContent(
    $tagIds: [ID!]!,
    $contentItemIds: [ID!]!
  ) {
    removeTagsFromContent(
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