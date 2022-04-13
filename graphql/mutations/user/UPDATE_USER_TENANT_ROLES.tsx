import { gql } from '@apollo/client';
import { UserFragment } from '../../queries/users';

export const UPDATE_USER_TENANT_ROLES = gql`
  mutation UpdateUserTenantRoles(
    $userId: ID!,
    $roleIds: [ID!]!
  ) {
    updateUserTenantRoles(
      userId: $userId
      roleIds: $roleIds
    ) {
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragment}
`