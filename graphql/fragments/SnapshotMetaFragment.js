import { gql } from '@apollo/client';

export const SnapshotMetaFragment = gql`
fragment SnapshotMeta on Snapshot {
  uri
}
`