import { gql } from '@apollo/client';

export const REMOVE_PROVIDED_CONTENT_FROM_GROUP = gql`
  mutation RemoveProvidedContentFromGroup(
    $contentItemIds: [ID!]!,
    $groupId: ID!
  ) {
    removeProvidedContentFromGroup(
      input: {
        contentItemIds: $contentItemIds,
        groupId: $groupId
      }
    ) {
      group {
        availableCourses {
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
