import { gql } from '@apollo/client';


export const DELETE_COURSE = gql`
  mutation DeleteCourse(
    $id: ID!
  ) {
    deleteCourse(
      id: $id
    ) {
      message
    }
  }
`;
