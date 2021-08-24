import { gql } from '@apollo/client';
import contentTypes from '../../contentTypes';
// import { ContentTagFragment } from '../fragments/ContentTagFragment';

// Generate the string of all graphQL types for the library query

// Define the query for the entire library, using the contentTypesGQL string
export const GET_LIBRARY = gql`
  query GetLibrary {
    libraryItems {
      title
    }
  }
`