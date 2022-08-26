import { gql } from "@apollo/client";

export const GET_ADMIN_DASHBOARD_DATA = gql`
    query GetAdminDashboardData {
      users {
        totalCount
      }
      groups {
        totalCount
      }
      courses {
        totalCount
      }
      libraryItems {
        totalCount
      }
    }
  `
