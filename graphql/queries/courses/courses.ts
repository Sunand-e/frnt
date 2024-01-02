import { gql } from "@apollo/client";

export const GET_COURSES = gql`
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
          tags {
            edges {
              node {
                id
                label
                tagType
              }
            }
          }
          _deleted @client
          _isOptimistic @client
        }
      }
    }
  }
`