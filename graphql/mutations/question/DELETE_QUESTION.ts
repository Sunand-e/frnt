import { gql } from '@apollo/client';


export const DELETE_QUESTION = gql`
  mutation DeleteQuestion(
    $id: ID!
  ) {
    deleteQuestion(
      id: $id
    ) {
      message
    }
  }
`;
