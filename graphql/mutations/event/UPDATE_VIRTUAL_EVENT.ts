import { gql } from '@apollo/client';
import { EventFragment } from '../../queries/events';


export const UPDATE_PHYSICAL_EVENT = gql`
  mutation UpdateVirtualEvent(
    $id: ID!,
    $name: String,
    $shortName: String,
    $parentId: ID,
    $settings: JSON,
    $url: String
  ) {
    updateVirtualEvent(
      input: {
        id: $id,
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
