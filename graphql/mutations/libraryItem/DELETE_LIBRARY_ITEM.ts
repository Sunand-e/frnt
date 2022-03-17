import { gql } from '@apollo/client';


export const DELETE_LIBRARY_ITEM = gql`
  mutation DeleteLibraryItem(
    $id: ID!
  ) {
    deleteLibraryItem(
      id: $id
    ) {
      message
      contentItem {
        id
        _deleted @client
      }
    }
  }
`;
