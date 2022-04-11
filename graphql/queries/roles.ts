import { gql } from '@apollo/client';
import { CapabilityFragment } from './capabilities';

export const RoleFragment = gql`
  fragment RoleFragment on Role {
    id
    name
    roleType
    capabilities {
      ...CapabilityFragment
    }
    _deleted @client
  }
  ${CapabilityFragment}
`

export const GET_ROLE = gql`
  query GetRole($id: ID!) {
    role(id: $id) {
      ...RoleFragment
    }
  }
  ${RoleFragment}
`
export const GET_ROLES = gql`
  query GetRoles {
    roles {
      ...RoleFragment
    }
  }
  ${RoleFragment}
`
