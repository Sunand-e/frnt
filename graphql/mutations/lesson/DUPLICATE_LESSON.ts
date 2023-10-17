import { gql } from '@apollo/client';
import { LessonFragment } from '../../queries/allQueries';

export const DUPLICATE_LESSON = gql`
  mutation DuplicateLesson(
    $id: ID!
    $parentId: ID
  ) {
    duplicateLesson(
      id: $id
      parentId: $parentId
    ) {
      contentItem {
        ...LessonFragment
        parents {
          id
        }
      }
    }
  }
  ${LessonFragment}
`;
