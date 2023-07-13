import { gql } from "@apollo/client"

// export const CREATE_SCO_ATTEMPT = gql`
//   mutation CreateScoAttempt(
//     $attempt: Int!,
//     $data: JSON!,
//     $contentItemId: ID!, 
//     $scormPackageId: ID!
//   ) {
//     createUserScoAttempt(input: {
//       attempt: $attempt,
//       data: $data,
//       contentItemId: $contentItemId,
//       scormPackageId: $scormPackageId
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
    $scormPackageId: ID!
  ) {
    upsertScoAttempt(input: {
      data: $data,
      attempt: $attempt,
      contentItemId: $contentItemId,
      scormPackageId: $scormPackageId
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
    $scormPackageId: ID!,
  ) {
    latestScoAttempt(
      courseId: $courseId,
      scormPackageId: $scormPackageId
    ) {
      id
      data
      attempt
    }
  }
`
