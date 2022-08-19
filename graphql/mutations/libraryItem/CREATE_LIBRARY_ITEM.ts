import { gql } from '@apollo/client';
import { LibraryItemFragment } from '../../queries/allQueries';


export const CREATE_LIBRARY_ITEM = gql`
  mutation CreateLibraryItem(
    $title: String,
    $contentType: String 
    $content: JSON,
    $settings: JSON,
    $imageId: ID,
    $mediaItemId: ID,
    $iconId: ID
  ) {

    createLibraryItem(
      input: {
        title: $title,
        contentType: $contentType,
        content: $content,
        settings: $settings,
        imageId: $imageId,
        mediaItemId: $mediaItemId,
        iconId: $iconId
      }
    ) {
      libraryItem {
        ...LibraryItemFragment
      }
      message
    }
  }
  ${LibraryItemFragment}
`;
