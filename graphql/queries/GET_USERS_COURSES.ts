import { gql } from '@apollo/client';
import { UserFragment } from './users';

export const GET_USERS_COURSES = gql`
  query GetUsersCourses($first: Int, $after: String, $where: JSON) {
    users(first: $first, after: $after, where: $where) {
      edges {
        node {
          ...UserFragment
          courses {
            edges {
              userId
              node {
                id
              }
              status
              lastVisited
              firstVisited
              createdAt
              updatedAt
              completedAt
              passedAt
              score
              progress
              visits
            }
          }
          groups {
            edges {
              groupId
              userId
              node {
                id
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
  ${UserFragment}
`
