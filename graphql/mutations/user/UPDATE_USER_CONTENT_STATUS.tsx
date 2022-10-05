import { gql } from '@apollo/client';
import { UserContentEdgeFragment } from '../../queries/users';

const UserContentFragment = gql`
  fragment UserContentFragment on UserContent {
    status
    score
    updatedAt
    completed
    properties
    lastVisited
    firstVisited
    contentItem {
      id
      itemType
    }
    user {
      id
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
    $visits: Int
    $completed: Boolean
  ) {
    updateUserContentStatus(input: {
      contentItemId: $contentItemId, 
      completed: $completed,
      firstVisited: $firstVisited,
      lastVisited: $lastVisited,
      score: $score,
      status: $status,
      userId: $userId,
      visits: $visits
    }) {
      userContents {
        ...UserContentFragment
      }
    }
  }
  ${UserContentFragment}
`
