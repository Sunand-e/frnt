import { gql } from '@apollo/client';
import { UserContentConnectionFragment, UserFragment } from './users';

export const GET_USERS_COURSES = gql`
  query GetUsersCourses {
    users {
      edges {
        node {
          ...UserFragment
          courses {
            edges {
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
              node {
                id
              }
            }
          }
        }
      }
    }
    groups {
      edges {
        node {
          id
          assignedCourses {
            edges {
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
