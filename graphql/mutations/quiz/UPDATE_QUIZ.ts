import { gql } from '@apollo/client';
import { QuizFragment } from '../../queries/allQueries';


export const UPDATE_QUIZ = gql`
  mutation UpdateQuiz(
    $id: ID!
    $title: String,
    $content: JSON,
    $contentType: String,
    $scormId: ID,
    $childrenIds: JSON,
    $prerequisites: JSON
  ) {
    updateQuiz(
      input: {
        id: $id,
        title: $title,
        content: $content,
        contentType: $contentType,
        scormId: $scormId,
        childrenIds: $childrenIds,
        prerequisites: $prerequisites
      }
    ) {
      quiz {
        ...QuizFragment
      }
    }
  }
  ${QuizFragment}
`;
