import { gql } from '@apollo/client';

export const ResourceMetaFragment = gql`
fragment ResourceMeta on Resource {
  resourceTags {
    nodes {
      name
      slug
      id
    }
  }
}
`