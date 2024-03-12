import { gql } from '@apollo/client';


export const PROVIDE_CONTENT_TO_GROUPS = gql`
  mutation ProvideContentToGroups(
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
        availableCourses {
          edges {
            node {
              id
            }
          }
        }
      }
      contentItems {
        id
        groupsAssigned {
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
