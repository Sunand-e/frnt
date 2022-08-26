import { gql } from '@apollo/client';

export const DELETE_MEDIA_ITEM = gql`
  mutation DeleteMediaItem(
    $id: ID!
  ) {
    deleteMediaItem(
      id: $id
    ) {
      mediaItem {
        id
      }
      message
    }
  }
`;
