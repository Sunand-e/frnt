import { gql } from '@apollo/client';


export const DELETE_PATHWAY = gql`
  mutation DeletePathway(
    $id: ID!
  ) {
    deletePathway(
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
