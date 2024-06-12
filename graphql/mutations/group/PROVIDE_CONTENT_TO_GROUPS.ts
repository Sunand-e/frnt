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
        name
        provisionedContents {
          edges {
            node {
              id
            }
          }
        }
      }
      contentItems {
        id
        groupsProvisioned {
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
