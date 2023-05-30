import { gql } from '@apollo/client';

export const UserContentStatusFragment = gql`
  fragment UserContentStatusFragment on UserContentEdge {
    userId
    status
    score
    progress
    updatedAt
    completed
    properties
    lastVisited
    firstVisited
    node {
      id
      # itemType
    }
  }
`

export const UPDATE_USER_CONTENT_STATUS = gql`
  mutation UpdateUserContentStatus(
    $userId: ID
    $contentItemId: ID!
    $status: String
    $lastVisited: ISO8601DateTime
    $firstVisited: ISO8601DateTime
    $score: Int
    $progress: Int
    $visits: Int
    $completed: Boolean
  ) {
    updateUserContentStatus(input: {
      contentItemId: $contentItemId, 
      completed: $completed,
      firstVisited: $firstVisited,
      lastVisited: $lastVisited,
      score: $score,
      progress: $progress,
      status: $status,
      userId: $userId,
      visits: $visits
    }) {
      userContents {
        edges {
          ...UserContentStatusFragment
        }
      }
    }
  }
  ${UserContentStatusFragment}
`
