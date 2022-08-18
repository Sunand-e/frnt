import { gql } from '@apollo/client';

export const DELETE_EVENT = gql`
  mutation DeleteEvent(
    $id: ID!
  ) {
    deleteEvent(
      id: $id
    ) {
      event {
        id
        _deleted @client
      }
      message
    }
  }
`;
