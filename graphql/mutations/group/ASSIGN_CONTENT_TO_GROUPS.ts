import { gql } from '@apollo/client';


export const ASSIGN_CONTENT_TO_GROUPS = gql`
  mutation AssignContentToGroups(
    $contentItemIds: [ID!]!,
    $groupIds: [ID!]!
  ) {
    assignContentToGroups(
      input: {
        contentItemIds: $contentItemIds,
        groupIds: $groupIds
      }
    ) {
      groups {
        id
        name
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
      contentItems {
        id
        groupsAssigned {
          edges {
            createdAt
            groupId
            contentItemId
            node {
              id
            }
          }
        }
      }
    }
  }
`;
