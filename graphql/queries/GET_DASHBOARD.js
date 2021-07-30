import { gql } from '@apollo/client';

export const GET_DASHBOARD = gql`
  query GetDashboard {
    contentItems {
      title
    }
  }
`