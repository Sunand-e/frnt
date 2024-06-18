import { gql } from '@apollo/client';
import { UserGroupsFragment } from '../../queries/userDetails';


export const ADD_USERS_TO_GROUPS = gql`
  mutation AddUsersToGroups(
    $userIds: [ID!]!,
    $groupIds: [ID!]!
    $roleId: ID
  ) {
    addUsersToGroups(
      userIds: $userIds,
      groupIds: $groupIds
      roleId: $roleId
    ) {
      groups {
        id
        name
        users {
          totalCount
          edges {
            node {
              id
            }
          }
        }
      }
      users {
        id
        ...UserGroupsFragment
      }
    }
  }
  ${UserGroupsFragment}
`