import { gql } from '@apollo/client';
import contentTypes from '../../contentTypes';
import { ContentTagFragment } from '../fragments/ContentTagFragment';

// Generate the string of all graphQL types for the library query

const contentTypesGQL = `[
  ${
    contentTypes.reduce(( accumulator, currentValue, index, array) => {
      if(currentValue.notInLibrary !== true) {
        const prefix = currentValue?.prefix ?? ''
        accumulator += prefix + currentValue.slug.toUpperCase() + ', ';
      }
      return accumulator
    }, '')
  }
]`

// Define the query for the entire library, using the contentTypesGQL string
export const GET_LIBRARY = gql`
  query GetLibrary {
    contentNodes(first:1000, where: {
      contentTypes: ${contentTypesGQL}
      orderby: {
        field:DATE
        order:DESC
      }
    }) {
      nodes {
        __typename
        id
        slug
        date
        ... on NodeWithTitle {
          title
        }
        ... on NodeWithExcerpt {
          excerpt
        }
        ... on NodeWithContentEditor {
          content
        }
        ... on NodeWithFeaturedImage {
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
        contentType {
          node {
            name
            labels {
              name
            }
          }
        }
        ... on SmContentInterface {
          buttonText
          contentTagss {
            nodes {
              ...ContentTagFragment
            }
          }
        }
      }
    }
  }
  ${ContentTagFragment}
`