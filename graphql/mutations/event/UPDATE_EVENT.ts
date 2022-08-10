import { gql } from '@apollo/client';
import { EventFragment } from '../../queries/events';


export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!,
    $title: String,
    $location: JSON,
    $provider: String,
  ) {
    updateEvent(
      input: {
        id: $id,
        title: $title
        location: $location
        provider: $provider
      }
    ) {
      event {
        ...EventFragment
      }
    }
  }
  ${EventFragment}
`;
