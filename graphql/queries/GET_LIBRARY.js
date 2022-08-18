import { gql } from '@apollo/client';
// import { ContentTagFragment } from '../fragments/ContentTagFragment';

// Generate the string of all graphQL types for the library query

// Define the query for the entire library
export const GET_LIBRARY = gql`
  query GetLibrary {
    libraryItems {
      edges {
        node {
          title
        }
      }
    }
  }
`