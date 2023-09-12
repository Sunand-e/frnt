import { gql } from '@apollo/client';
import { QuizFragment } from '../../queries/allQueries';

export const CREATE_QUIZ = gql`
  mutation CreateQuiz(
    $title: String,
    $content: JSON,
    $contentType: String,
    $parentIds: JSON,
    $prerequisites: JSON,
    $imageId: ID,
    $iconId: ID
  ) {
    createQuiz(
      input: {
        title: $title,
        content: $content,
        contentType: $contentType,
        parentIds: $parentIds,
        prerequisites: $prerequisites,
        imageId: $imageId,
        iconId: $iconId
      }
    ) {
      quiz {
        ...QuizFragment
      }
      message
    }
  }
  ${QuizFragment}
`;
