import { gql } from '@apollo/client';

export const SHARE_CONTENT_ITEMS = gql`
  mutation ShareContentItems(
    $contentItemIds: [ID!]!,
    $tenantId: ID!
  ) {
    shareContentItems(
      input: {
        contentItemIds: $contentItemIds,
        tenantId: $tenantId,
      }
    ) {
      message
    }
  }
`;
