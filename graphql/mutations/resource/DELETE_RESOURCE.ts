import { gql } from '@apollo/client';


export const DELETE_RESOURCE = gql`
  mutation DeleteResource(
    $id: ID!
  ) {
    deleteResource(
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
