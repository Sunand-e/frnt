import { gql } from "@apollo/client"
import { UserQuestionAttemptFragment } from "./questions"
import { UserContentConnectionFragment } from "./users"

export const UserQuizAttemptFragment = gql`
  fragment UserQuizAttemptFragment on UserQuizAttempt {
    id
    createdAt
    updatedAt
    completedAt
    status
    score
    # contentItem {
    #   id
    # }
    # user {
    #   id
    # }
    userQuestionAttempts {
      ...UserQuestionAttemptFragment
    }
  }
  ${UserQuestionAttemptFragment}
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
    $finished: Boolean,
  ) {
    updateUserQuizAttempt(input: {
      id: $id,
      finished: $finished,
    }) {
      userQuizAttempt {
        ...UserQuizAttemptFragment
      }
      userContent {
        edges {
          userId
          node {
            id
          }
          status
        }
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