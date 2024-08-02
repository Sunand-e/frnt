import { gql } from '@apollo/client';


export const UNENROL_USER_FROM_CONTENT = gql`
  mutation RemoveAssignedContent(
    $contentItemIds: [ID!]!
    $userIds: [ID!]!
  ) {
    removeAssignedContent(
      input: {
        contentItemIds: $contentItemIds
        userIds: $userIds
      }
    ) {
      status
    }
  }
`;