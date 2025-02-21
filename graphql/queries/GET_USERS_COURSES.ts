import { gql } from '@apollo/client';
import { UserFragment } from './users';

export const GET_USERS_COURSES = gql`
  query GetUsersCourses {
    users {
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
    }
  }
  ${UserFragment}
`
