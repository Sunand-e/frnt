import { gql } from '@apollo/client';

export const GET_DASHBOARD = gql`
  query GetDashboard {
    courses {
      edges {
        node {
          title
          image {
            location
          }
        }
      }
    }
    libraryItems {
      edges {
        node {
          title
          image {
            location
          }
        }
      }
    }
  }
`