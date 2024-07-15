import { gql } from "@apollo/client";

export const COURSES_REPORT_QUERY = gql`
  query CoursesReportQuery {
    courses(where: { includeProvisioned: true }) {
      edges {
        userId
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
    }
  }
`;
