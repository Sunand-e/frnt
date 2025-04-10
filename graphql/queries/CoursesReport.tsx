import { gql } from "@apollo/client";

export const COURSES_REPORT_QUERY = gql`
  query CoursesReportQuery($first: Int, $after: String, $where: JSON) {
    courses(where: $where, first: $first, after: $after) {
      edges {
        userId
        groups {
          edges {
            node {
              id
              name
            }
          }
        }
        node {
          id
          title
          itemType
          groupsAssigned {
            edges {
              node {
                id
              }
            }
          }
          groupsProvisioned {
            edges {
              node {
                id
              }
            }
          }
          _deleted @client
          image {
            id
            location
          }
          tags {
            edges {
              contentItemId
              id
              order
              node {
                id
                label
              }
            }
          }
          users {
            totalCount
            edges {
              score
              progress
              status
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
`;
