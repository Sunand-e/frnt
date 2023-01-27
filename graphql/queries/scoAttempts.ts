import { gql } from "@apollo/client"

// export const CREATE_SCO_ATTEMPT = gql`
//   mutation CreateScoAttempt(
//     $attempt: Int!,
//     $data: JSON!,
//     $contentItemId: ID!, 
//     $scormModuleId: ID!
//   ) {
//     createUserScoAttempt(input: {
//       attempt: $attempt,
//       data: $data,
//       contentItemId: $contentItemId,
//       scormModuleId: $scormModuleId
//     }) {
//       id
//       data
//     }
//   }
// `
export const UPSERT_SCO_ATTEMPT = gql`
  mutation UpsertScoAttempt(
    $data: JSON!,
    $attempt: Int!,
    $contentItemId: ID!,
    $scormModuleId: ID!
  ) {
    upsertScoAttempt(input: {
      data: $data,
      attempt: $attempt,
      contentItemId: $contentItemId,
      scormModuleId: $scormModuleId
    }) {
      id
      data
      attempt
    }
  }
`

// export const UPDATE_SCO_ATTEMPT = gql`
//   mutation UpdateScoAttempt(
//     $id: ID!,
//     $data: JSON!,
//   ) {
//     updateUserScoAttempt(input: {
//       id: $id,
//       data: $data,
//     }) {
//       data
//     }
//   }
// `

export const GET_LATEST_SCO_ATTEMPT = gql`
  query GetLatestScoAttempt(
    $courseId: ID!,
    $scormModuleId: ID!,
  ) {
    latestScoAttempt(
      courseId: $courseId,
      scormModuleId: $scormModuleId
    ) {
      id
      data
      attempt
    }
  }
`
