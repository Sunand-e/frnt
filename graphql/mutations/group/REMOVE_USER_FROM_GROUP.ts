import { gql } from '@apollo/client';


export const REMOVE_USER_FROM_GROUP = gql`
  mutation RemoveUserFromGroup(
    $userId: ID!,
    $groupId: ID!
  ) {
    removeUserFromGroup(
      userId: $userId,
      groupId: $groupId
    ) {
      membership {
        user {
          fullName
        }
      }
    }
  }
`;
