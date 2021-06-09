import { gql } from '@apollo/client';

export const ProcessFlowMetaFragment = gql`
fragment ProcessFlowMeta on ProcessFlow {
  uri
}
`