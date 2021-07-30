import { gql } from '@apollo/client';

export const EventMetaFragment = gql`
fragment EventMeta on Event {
  uri
}
`