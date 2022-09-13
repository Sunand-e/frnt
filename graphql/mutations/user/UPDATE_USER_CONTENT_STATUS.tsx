import { gql } from '@apollo/client';

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
      # userContent {
      #   id
      #   # contentItemId
      #   status
      #   lastVisited
      #   firstVisited
      #   createdAt
      #   updatedAt
      #   score
      #   visits
      #   completed
      # }
      user {
        id
        # # contentItemId
        # status
        # lastVisited
        # firstVisited
        # createdAt
        # updatedAt
        # score
        # visits
        # completed
      }
    }
  }
`
