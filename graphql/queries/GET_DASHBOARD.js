import { gql } from '@apollo/client';

export const GET_DASHBOARD = gql`
  query GetDashboard {
    courses {
      title
      image {
        location
      }
    }
    libraryItems {
      title
      image {
        location
      }
    }
  }
`