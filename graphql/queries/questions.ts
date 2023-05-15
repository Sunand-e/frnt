import { gql } from "@apollo/client"

export const UserQuestionAttemptFragment = gql`
  fragment UserQuestionAttemptFragment on UserQuestionAttempt {
    id
    createdAt
    updatedAt
    answers
    question {
      id
    }
    status
    userQuizAttempt {
      contentItem {
        id
      }
      user {
        id
      }
    }
  }
`

export const CREATE_USER_QUESTION_ATTEMPT = gql`
  mutation CreateUserQuestionAttempt(
    $userQuizAttemptId: ID!
    $questionId: ID!
    $status: String!
    $score: Int!
    $answers: JSON
  ) {
    createUserQuestionAttempt(input: {
      userQuizAttemptId: $userQuizAttemptId,
      questionId: $questionId,
      status: $status,
      score: $score,
      answers: $answers
    }) {
      userQuestionAttempt {
        ...UserQuestionAttemptFragment
      }
    }
  }
  ${UserQuestionAttemptFragment}
`
