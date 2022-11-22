import { gql } from '@apollo/client';


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
          nodes {
            id
          }
        }
      }
      users {
        id
        groups {
          nodes {
            id
          }
        }
      }
    }
  }
`;
