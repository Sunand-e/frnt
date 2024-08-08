import { gql } from '@apollo/client';

export const REMOVE_ASSIGNED_CONTENT_FROM_GROUPS = gql`
  mutation removeAssignedContentFromGroups(
    $contentItemIds: [ID!]!,
    $groupIds: [ID!]!
  ) {
    removeAssignedContentFromGroups(
      input: {
        contentItemIds: $contentItemIds,
        groupIds: $groupIds
      }
    ) {
      groups {
        id
        assignedCourses {
          totalCount
        }
        assignedResources {
          totalCount
        }
        assignedPathways {
          totalCount
        }
        assignedContents {
          totalCount
            edges {
            createdAt
            groupId
            contentItemId
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
