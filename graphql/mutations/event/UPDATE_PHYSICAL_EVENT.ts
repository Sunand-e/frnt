import { gql } from '@apollo/client';
import { EventFragment } from '../../queries/events';


export const UPDATE_PHYSICAL_EVENT = gql`
  mutation UpdatePhysicalEvent(
    $id: ID!,
    $name: String,
    $shortName: String,
    $parentId: ID,
    $settings: JSON,
    $url: String
  ) {
    updatePhysicalEvent(
      input: {
        id: $id,
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
