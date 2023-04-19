import { gql } from '@apollo/client';
import { QuestionFragment } from '../../queries/allQueries';

export const CREATE_QUESTION = gql`
  mutation CreateQuestion(
    $id: ID
    $order: Int
    $contentItemId: ID!
    $questionType: String!
    $content: JSON
    $answers: JSON
  ) {
    createQuestion(
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
