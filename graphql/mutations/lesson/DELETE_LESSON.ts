import { gql } from '@apollo/client';


export const DELETE_LESSON = gql`
  mutation DeleteLesson(
    $id: ID!
  ) {
    deleteLesson(
      id: $id
    ) {
      message
    }
  }
`;
