import { gql } from '@apollo/client';


export const PROVIDE_CONTENT_TO_GROUPS = gql`
  mutation ProvideContentToGroups(
    $contentItemIds: [ID!]!,
    $groupIds: [ID!]!
  ) {
    provideContentToGroups(
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
      contentItems {
        id
        groupsProvisioned {
          edges {
            groupId
            contentItemId
            createdAt
            node {
              id
            }
          }
        }
      }
    }
  }
`;
