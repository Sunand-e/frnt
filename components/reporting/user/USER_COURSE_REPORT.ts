import { gql } from "@apollo/client";

export const USER_COURSE_REPORT = gql`
  query getUsersModules($userId: ID!, $where: JSON) {
    user(id: $userId) {
      fullName
      courses(where: $where) {
        edges {
          node {
            id
            sections {
              id
              title
              _deleted @client
              children {
                title
                contentType
                itemType
                __typename
                _deleted @client
                id
              }
            }
          }
        }
      }
      lessons(where: $where) {
        edges {
          node {
            id
            title
            contentType
          }
          status
          lastVisited
          firstVisited
          createdAt
          updatedAt
          score
          progress
          visits
          completed
        }
        totalCount
      }
      quizzes(where: $where) {
        edges {
          node {
            id
            title
            contentType
          }
          status
          lastVisited
          firstVisited
          createdAt
          updatedAt
          score
          progress
          visits
          completed
        }
        totalCount
      }
    }
  }
`