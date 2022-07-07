import { gql } from '@apollo/client';

export const DELETE_TENANT = gql`
  mutation DeleteTenant(
    $id: ID!
  ) {
    deleteTenant(
      id: $id
    ) {
      tenant {
        id
        _deleted @client
      }
      message
    }
  }
`;
