import { gql } from '@apollo/client';


export const DELETE_SECTION = gql`
  mutation DeleteSection(
    $id: ID!
  ) {
    deleteSection(
      id: $id
    ) {
      message
    }
  }
`;
