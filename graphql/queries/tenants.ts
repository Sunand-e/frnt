import { gql } from '@apollo/client';
import { CapabilityFragment } from './capabilities';

export const TenantFragment = gql`
  fragment TenantFragment on Tenant {
    id
    name
    url
    updatedAt
    # _deleted @client
  }
`

export const GET_TENANT = gql`
  query GetTenant($id: ID) {
    tenant(id: $id) {
      ...TenantFragment
    }
  }
  ${TenantFragment}
`
export const GET_TENANTS = gql`
  query GetTenants {
    tenants {
      ...TenantFragment
      
    }
  }
  ${TenantFragment}
`
