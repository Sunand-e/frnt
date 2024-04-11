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
        provisionedCourses {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;
