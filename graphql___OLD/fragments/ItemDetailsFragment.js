import { gql } from '@apollo/client';

const ItemDetailsFragment = (typeName, metaFragment) => gql`
  fragment ${typeName}Details on ${typeName} {
    id
    slug
    ...${typeName}Meta
    ... on NodeWithTitle {
      title
    }
    ... on NodeWithContentEditor {
      content
    }
    contentTagss {
      nodes {
        name
        slug
        id
      }
    }

    featuredImage {
      node {
        sourceUrl
      }
    }
  }
  ${metaFragment}
`
export default ItemDetailsFragment