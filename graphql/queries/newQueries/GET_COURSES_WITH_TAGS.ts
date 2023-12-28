import { gql } from "@apollo/client";

export const GET_COURSES_WITH_TAGS = gql`
  query GetCourses {
    courses {
      totalCount
      notStartedCount
      inProgressCount
      completedCount
      edges {
        userId
        status
        lastVisited
        completedAt
        progress
        properties
        node {
          id
          title
          order
          content
          contentType
          itemType
          shared
          prerequisites
          tags {
            edges {
              node {
                id
              }
            }
          }
          image {
            location
            id
            altText
            properties
            title
            fileName
          }
          icon {
            provider
            properties
            id
          }
          _deleted @client
          _isOptimistic @client
        }
      }
    }
  }
`