import { gql } from '@apollo/client';

export const REMOVE_PROVISIONED_CONTENT_FROM_GROUPS = gql`
  mutation removeProvisionedContentFromGroups(
    $contentItemIds: [ID!]!,
    $groupIds: [ID!]!
  ) {
    removeProvisionedContentFromGroups(
      input: {
        contentItemIds: $contentItemIds,
        groupIds: $groupIds
      }
    ) {
      groups {
        id
        provisionedContents {
          edges {
            groupId
            contentItemId
            createdAt
            node {
              id
              title
              itemType
            }
          }
        }
      }
    }
  }
`;
