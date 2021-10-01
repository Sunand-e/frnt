import { gql } from '@apollo/client';
import { LessonFragment } from '../../queries/allQueries';

export const CREATE_LESSON = gql`
  mutation CreateLesson(
    $title: String!,
    $content: JSON,
    $parentIds: JSON,
    $prerequisites: JSON,
    $imageId: ID,
    $iconId: ID
  ) {
    createLesson(
      input: {
        title: $title,
        content: $content,
        parentIds: $parentIds,
        prerequisites: $prerequisites,
        imageId: $imageId,
        iconId: $iconId
      }
    ) {
      lesson {
        ...LessonFragment
      }
      message
    }
  }
  ${LessonFragment}
`;
