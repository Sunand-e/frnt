import { gql } from '@apollo/client';

export const REVOKE_SHARE_CONTENT_ITEMS = gql`
  mutation RevokeShareContentItems(
    $contentItemIds: [ID!]!,
    $tenantId: ID!
  ) {
    revokeShareContentItems(
      input: {
        contentItemIds: $contentItemIds,
        tenantId: $tenantId,
      }
    ) {
      message
    }
  }
`;
