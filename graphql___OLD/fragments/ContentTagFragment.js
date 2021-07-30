import { gql } from '@apollo/client';

export const ContentTagFragment = gql`
fragment ContentTagFragment on ContentTag {
  id
  slug
  name
  count
  smTaxonomyIcon {
    class
    name
    provider
    value
  }
}
`