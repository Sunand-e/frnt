import { gql } from '@apollo/client';

export const PostMetaFragment = gql`
fragment PostMeta on Post {
  uri
}
`