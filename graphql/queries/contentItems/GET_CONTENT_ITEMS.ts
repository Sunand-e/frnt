import { gql } from "@apollo/client";

export const GET_CONTENT_ITEMS = gql`
  query GetContentItems($itemType: [String!]) {
    contentItems(itemType: $itemType) {
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
    }
  }
`