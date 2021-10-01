import { gql } from '@apollo/client';


export const CREATE_LIBRARY_ITEM = gql`
  mutation CreateLibraryItem(
    $title: String!,
    $contentType: String 
    $content: JSON,
    $childrenIds: JSON,
    $imageId: ID,
    $iconId: ID
  ) {

    createLibraryItem(
      input: {
        title: $title,
        contentType: $contentType,
        content: $content,
        childrenIds: $childrenIds,
        imageId: $imageId,
        iconId: $iconId
      }
    ) {
      libraryItem {
        id
      }
      message
    }
  }
`;
