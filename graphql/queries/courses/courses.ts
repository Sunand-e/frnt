import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query GetCourses($first: Int, $after: String) {
    courses(first: $first, after: $after) {
      totalCount
      notStartedCount
      inProgressCount
      completedCount
      edges {
        userId
        status
        lastVisited
        completedAt
        passedAt
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
          settings
          createdAt
          updatedAt
          enrolmentsRemaining
          creditsUsed
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
              order
              contentItemId
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
      pageInfo{
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
