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
          edges {
            node {
              id
            }
          }
        }
      }
      users {
        id
        groups {
          edges {
            groupId
            userId
            node {
              id
            }
          }
        }
      }
    }
  }
`;
