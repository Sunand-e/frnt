import { gql } from '@apollo/client';

export const REORDER_TAGS = gql`
  mutation ReorderTags(
    $id: ID!,
    $order: Int!
  ) {
    reorderTags(
      input: {
        id: $id,
        order: $order,
      }
    ) {
      tag {
        id
        order
      }
    }
  }
`;
