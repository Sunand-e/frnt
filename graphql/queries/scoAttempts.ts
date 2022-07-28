import { gql } from "@apollo/client"

export const CREATE_SCO_ATTEMPT = gql`
  mutation CreateScoAttempt(
    $attempt: Int!,
    $data: JSON!,
    $contentItemId: ID!, 
    $scormModuleId: ID!
  ) {
    createUserScoAttempt(input: {
      attempt: $attempt,
      data: $data,
      contentItemId: $contentItemId,
      scormModuleId: $scormModuleId
    }) {
      id
      data
    }
  }
`

export const UPDATE_SCO_ATTEMPT = gql`
  mutation UpdateScoAttempt(
    $id: ID!,
    $data: JSON!,
  ) {
    updateUserScoAttempt(input: {
      id: $id,
      data: $data,
    }) {
      data
    }
  }
`

export const GET_LATEST_SCO_ATTEMPT = gql`
  query GetLatestScoAttempt(
    $courseId: ID!,
    $scormModuleId: ID!,
  ) {
    userLatestScoAttempt(
      courseId: $courseId,
      scormModuleId: $scormModuleId
    ) {
      id
    }
  }
`
