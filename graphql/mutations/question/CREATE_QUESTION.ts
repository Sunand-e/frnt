import { gql } from '@apollo/client';
import { QuestionFragment } from '../../queries/allQueries';

export const CREATE_QUESTION = gql`
  mutation CreateQuestion(
    $title: String,
    $content: JSON,
    $contentType: String,
    $parentIds: JSON,
    $prerequisites: JSON,
    $imageId: ID,
    $iconId: ID
  ) {
    createQuestion(
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
      question {
        ...QuestionFragment
      }
      message
    }
  }
  ${QuestionFragment}
`;
