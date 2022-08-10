import { gql } from '@apollo/client';
import { EventFragment } from '../../queries/events';

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!,
    $eventModelType: String!,
    $location: JSON,
    $provider: String,
  ) {
    createEvent(
      input: {
        title: $title
        eventModelType: $eventModelType
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
