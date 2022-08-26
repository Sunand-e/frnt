import { gql } from '@apollo/client';
import { MediaItemFragment } from '../../queries/mediaItems';


export const UPDATE_MEDIA_ITEM = gql`
  mutation UpdateMediaItem(
    $id: ID!
    $title: String
    $properties: JSON
    $altText: String
  ) {
    updateMediaItem(
      input: {
        id: $id
        title: $title
        properties: $properties
        altText: $altText

      }
    ) {
      mediaItem {
        ...MediaItemFragment
      }
    }
  }
  ${MediaItemFragment}
`;
