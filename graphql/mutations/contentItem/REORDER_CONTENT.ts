import { gql } from '@apollo/client';

export const REORDER_CONTENT = gql`
  mutation ReorderContent(
    $id: ID!,
    $order: Int!
  ) {
    reorderContentItems(
      input: {
        id: $id,
        order: $order,
      }
    ) {
      tenantContentItem {
        contentItem {
          id
          order
        }
      }
    }
  }
`;
