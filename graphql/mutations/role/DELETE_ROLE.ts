import { gql } from '@apollo/client';

export const DELETE_ROLE = gql`
  mutation DeleteRole(
    $id: ID!
  ) {
    deleteRole(
      id: $id
    ) {
      role {
        id
        _deleted @client
      }
      message
    }
  }
`;
