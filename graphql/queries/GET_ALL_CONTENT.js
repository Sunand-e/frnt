import { gql } from '@apollo/client';

export const GET_ALL_CONTENT = gql`
  query GetAllContent {
    contentItems {
      title
    }
  }
`