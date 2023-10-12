import { gql } from '@apollo/client';
import { CourseFragment } from '../../queries/allQueries';

export const DUPLICATE_COURSE = gql`
  mutation DuplicateCourse(
    $id: ID!
  ) {
    duplicateCourse(
      id: $id
    ) {
      contentItem {
        ...CourseFragment
      }
    }
  }
  ${CourseFragment}
`;
