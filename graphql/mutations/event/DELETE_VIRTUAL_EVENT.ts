import { gql } from '@apollo/client';

export const DELETE_PHYSICAL_EVENT = gql`
  mutation DeleteVirtualEvent(
    $id: ID!
  ) {
    deleteVirtualEvent(
      id: $id
    ) {
      virtualEvent {
        id
        _deleted @client
      }
      message
    }
  }
`;
