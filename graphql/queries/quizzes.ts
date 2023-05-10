import { gql } from "@apollo/client"

export const UserQuizAttemptFragment = gql`
  fragment UserQuizAttemptFragment on UserQuizAttempt {
    id
    createdAt
    updatedAt
    finishedTime
    contentItem {
      id
    }
    user {
      id
    }
    userQuestionAttempts {
      id
      status
      question {
        id
      }
      answers
    }
  }
`

export const CREATE_USER_QUIZ_ATTEMPT = gql`
  mutation CreateUserQuizAttempt(
    $contentItemId: ID!
  ) {
    createUserQuizAttempt(input: {
      contentItemId: $contentItemId,
    }) {
      userQuizAttempt {
        ...UserQuizAttemptFragment
      }
    }
  }
  ${UserQuizAttemptFragment}
`

export const UPDATE_USER_QUIZ_ATTEMPT = gql`
  mutation UpdateUserQuizAttempt(
    $id: ID!,
    $finishedTime: String,
  ) {
    updateUserQuizAttempt(input: {
      id: $id,
      finishedTime: $finishedTime,
    }) {
      userQuizAttempt {
        ...UserQuizAttemptFragment
      }
    }
  }
  ${UserQuizAttemptFragment}
`

export const GET_LATEST_USER_QUIZ_ATTEMPT = gql`
  query GetLatestUserQuizAttempt(
    $contentItemId: ID!,
  ) {
    latestUserQuizAttempt(
      contentItemId: $contentItemId
    ) {
      ...UserQuizAttemptFragment
    }
  }
  ${UserQuizAttemptFragment}
`