import { gql } from '@apollo/client';


export const ASSIGN_TENANT_ADMIN = gql`
  mutation AssignTenantAdmin(
    $userType: String!,
    $id: ID!
  ) {
    assignTenantAdmin(
      input: {
        userType: $userType,
        id: $id
      }
    ) {
      user {
        id
      }
    }
  }
`;
