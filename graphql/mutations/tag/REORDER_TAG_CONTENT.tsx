import { gql } from '@apollo/client';

export const REORDER_TAG_CONTENT = gql`
  mutation ReorderTagContent(
    $contentItemId: ID!,
    $tagId: ID!,
    $order: Int!
  ) {
    reorderContentItemsWithinTags(
      input: {
        contentItemId: $contentItemId,
        tagId: $tagId,
        order: $order,
      }
    ) {
      tagAttachment {
        order
        tag {
          id
        }
      }
    }
  }
`;
