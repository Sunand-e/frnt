import { gql } from '@apollo/client';


export const UNENROL_USER_FROM_CONTENT = gql`
  mutation RemoveAssignedContent(
    $contentItemId: ID!
    $userId: ID!
    $roleIds: [ID!]
  ) {
    removeAssignedContent(
      input: {
        contentItemId: $contentItemId
        removeModel: "user"
        userId: $userId
        roleIds: $roleIds
      }
    ) {
      status
    }
  }
`;