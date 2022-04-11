import { gql } from '@apollo/client';

export const CapabilityFragment = gql`
  fragment CapabilityFragment on Capability {
    id
    name
    # _deleted @client
  }
`

export const GET_CAPABILITY = gql`
  query GetCapability($id: ID!) {
    capability(id: $id) {
      ...CapabilityFragment
    }
  }
  ${CapabilityFragment}
`
export const GET_CAPABILITIES = gql`
  query GetCapabilities {
    capabilities {
      ...CapabilityFragment
    }
  }
  ${CapabilityFragment}
`
