import { gql } from '@apollo/client';
import { EventFragment } from '../../queries/events';

export const CREATE_PHYSICAL_EVENT = gql`
  mutation CreatePhysicalEvent(
    $name: String!,
    $shortName: String!,
    $parentId: ID,
    $settings: JSON,
    $url: String!
  ) {
    createPhysicalEvent(
      input: {
        title: $title
      }
    ) {
      physicalEvent {
        ...EventFragment
      }
    }
  }
  ${EventFragment}
`;
