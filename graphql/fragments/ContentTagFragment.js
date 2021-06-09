import { gql } from '@apollo/client';

export const ContentTagFragment = gql`
fragment ContentTagFragment on ContentTag {
  id
  slug
  name
  count
  sm_taxonomy_icon {
    class
    name
    provider
    value
  }
}
`