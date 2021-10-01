import { gql } from '@apollo/client';
import { LessonFragment } from '../../queries/allQueries';


export const UPDATE_LESSON = gql`
  mutation UpdateLesson(
    $id: ID!
    $title: String,
    $content: JSON,
    $childrenIds: JSON,
    $prerequisites: JSON
  ) {
    updateLesson(
      input: {
        id: $id,
        title: $title,
        content: $content,
        childrenIds: $childrenIds,
        prerequisites: $prerequisites
      }
    ) {
      lesson {
        ...LessonFragment
      }
    }
  }
  ${LessonFragment}
`;
