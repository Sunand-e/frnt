import { gql } from '@apollo/client';
import { LibraryItemFragment } from '../../queries/allQueries';


export const UPDATE_LIBRARY_ITEM = gql`
  mutation UpdateLibraryItem(
    $id: ID!
    $title: String,
    $content: JSON,
    $settings: JSON,
    $imageId: ID,
    $mediaItemId: ID,
  ) {
    updateLibraryItem(
      input: {
        id: $id,
        title: $title,
        content: $content,
        settings: $settings,
        imageId: $imageId
        mediaItemId: $mediaItemId
      }
    ) {
      libraryItem {
        ...LibraryItemFragment
      }
    }
  }
  ${LibraryItemFragment}
`;
