import { gql } from '@apollo/client';
import { QuestionFragment } from '../../queries/allQueries';


export const UPDATE_QUESTION = gql`
  mutation UpdateQuestion(
    $id: ID!
    $title: String,
    $content: JSON,
    $contentType: String,
    $scormId: ID,
    $childrenIds: JSON,
    $prerequisites: JSON
  ) {
    updateQuestion(
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
      question {
        ...QuestionFragment
      }
    }
  }
  ${QuestionFragment}
`;
