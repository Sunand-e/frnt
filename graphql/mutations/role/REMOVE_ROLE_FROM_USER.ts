import { gql } from '@apollo/client';

export const REMOVE_ROLE_FROM_USER = gql`
  mutation RemoveRoleFromUser(
    $roleId: ID!,
    $userId: ID!,
  ) {
    removeRoleFromUser(
      roleId: $roleId,
      userId: $userId
    ) {
      message
    }
  }
`;
