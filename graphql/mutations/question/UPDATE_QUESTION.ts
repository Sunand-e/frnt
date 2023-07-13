import { gql } from '@apollo/client';
import { QuestionFragment } from '../../queries/allQueries';


export const UPDATE_QUESTION = gql`
  mutation UpdateQuestion(
    $id: ID!
    $order: Int
    $contentItemId: ID
    $questionType: String
    $content: JSON
    $answers: JSON
  ) {
    updateQuestion(
      input: {
        id: $id,
        order: $order,
        contentItemId: $contentItemId,
        questionType: $questionType,
        content: $content,
        answers: $answers
      }
    ) {
      question {
        ...QuestionFragment
      }
    }
  }
  ${QuestionFragment}
`;
