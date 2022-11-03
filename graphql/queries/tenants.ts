import { gql } from '@apollo/client';

export const TenantFragment = gql`
  fragment TenantFragment on Tenant {
    id
    name
    url
    updatedAt
    createdAt
    shortName
    settings
    logos
    groups {
      totalCount
    }
    users {
      totalCount
    }
    courses {
      totalCount
    }
    # _deleted @client
  }
`

export const GET_TENANT = gql`
  query GetTenant($id: ID!) {
    tenant(id: $id) {
      ...TenantFragment
      children {
        ...TenantFragment
      }
    }
  }
  ${TenantFragment}
`
export const GET_TENANTS = gql`
  query GetTenants {
    tenants {
      edges {
        node {
          ...TenantFragment
        }
      }
    }
  }
  ${TenantFragment}
`

export const TENANT_SHARED_ITEMS = gql`
  query GetTenantSharedItems(
    $where: JSON!
  ) {
    courses(where: $where) {
      edges {
        node {
          title
          id
        }
      }
    }
    pathways(where: $where) {
      edges {
        node {
          title
          id
        }
      }
    }
    resources(where: $where) {
      edges {
        node {
          title
          id
        }
      }
    }
  }
`