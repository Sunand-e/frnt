import { gql } from '@apollo/client';

export const ProgrammeMetaFragment = gql`
fragment ProgrammeMeta on Programme {
  uri
}
`