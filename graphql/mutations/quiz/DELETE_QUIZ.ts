import { gql } from '@apollo/client';


export const DELETE_QUIZ = gql`
  mutation DeleteQuiz(
    $id: ID!
  ) {
    deleteQuiz(
      id: $id
    ) {
      message
    }
  }
`;
