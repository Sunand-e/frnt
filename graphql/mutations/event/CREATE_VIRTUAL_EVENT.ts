import { gql } from '@apollo/client';
import { EventFragment } from '../../queries/events';

export const CREATE_PHYSICAL_EVENT = gql`
  mutation CreateVirtualEvent(
    $name: String!,
    $shortName: String!,
    $parentId: ID,
    $settings: JSON,
    $url: String!
  ) {
    createVirtualEvent(
      input: {
        title: $title
      }
    ) {
      virtualEvent {
        ...EventFragment
      }
    }
  }
  ${EventFragment}
`;
