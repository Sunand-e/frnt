import { gql } from '@apollo/client';


export const UNENROL_USER_FROM_CONTENT = gql`
  mutation RemoveEnrolledContents(
    $contentItemId: ID!
    $userId: ID!
    $roleIds: [ID!]
  ) {
    removeEnrolledContents(
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