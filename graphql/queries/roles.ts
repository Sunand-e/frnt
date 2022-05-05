import { gql } from '@apollo/client';
import { CapabilityFragment } from './capabilities';

export const RoleFragment = gql`
  fragment RoleFragment on Role {
    id
    name
    roleType
    _deleted @client
  }
`

export const GET_ROLE = gql`
  query GetRole($id: ID!) {
    role(id: $id) {
      ...RoleFragment
      capabilities {
        ...CapabilityFragment
      }
    }
  }
  ${RoleFragment}
  ${CapabilityFragment}
`
export const GET_ROLES = gql`
  query GetRoles {
    roles {
      ...RoleFragment
      
    }
  }
  ${RoleFragment}
`
