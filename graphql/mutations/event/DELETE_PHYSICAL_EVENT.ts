import { gql } from '@apollo/client';

export const DELETE_PHYSICAL_EVENT = gql`
  mutation DeletePhysicalEvent(
    $id: ID!
  ) {
    deletePhysicalEvent(
      id: $id
    ) {
      physicalEvent {
        id
        _deleted @client
      }
      message
    }
  }
`;
