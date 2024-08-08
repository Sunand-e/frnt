import { gql } from '@apollo/client';


export const REMOVE_USERS_FROM_GROUPS = gql`
  mutation RemoveUsersFromGroups(
    $userIds: [ID!]!
    $groupIds: [ID!]!
  ) {
    removeUsersFromGroups(
      userIds: $userIds,
      groupIds: $groupIds
    ) {
      memberships {
        group {
          id
          name
          users {
            edges {
              groupId
              userId
              node {
                id
              }
              roles {
                id
              }
            }
          }
        }
        user {
          id
          groups {
            edges {
              userId
              groupId
              roles {
                id
              }
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;
