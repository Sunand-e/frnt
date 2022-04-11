import { gql } from '@apollo/client';


export const ASSIGN_ROLE_TO_USER = gql`
  mutation AssignRoleToUser(
    $roleId: ID!
    $userId: ID!
  ) {
    assignRoleToUser(
      roleId: $roleId
      userId: $userId
    ) {
      message
    }
  }
`;
