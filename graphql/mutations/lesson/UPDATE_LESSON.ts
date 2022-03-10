import { gql } from '@apollo/client';
import { LessonFragment } from '../../queries/allQueries';


export const UPDATE_LESSON = gql`
  mutation UpdateLesson(
    $id: ID!
    $title: String,
    $content: JSON,
    $contentType: String,
    $scormId: ID,
    $childrenIds: JSON,
    $prerequisites: JSON
  ) {
    updateLesson(
      input: {
        id: $id,
        title: $title,
        content: $content,
        type: $contentType,
        scormId: $scormId,
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
