import { gql } from '@apollo/client';
import { QuizFragment } from '../../queries/allQueries';


export const UPDATE_QUIZ = gql`
  mutation UpdateQuiz(
    $id: ID!
    $title: String,
    $content: JSON,
    $contentType: String,
    $scormId: ID,
    $questions: [QuestionInput!],
    $prerequisites: JSON
  ) {
    updateQuiz(
      input: {
        id: $id,
        title: $title,
        content: $content,
        contentType: $contentType,
        scormId: $scormId,
        questions: $questions,
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
