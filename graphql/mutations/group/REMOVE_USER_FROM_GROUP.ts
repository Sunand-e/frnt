import { gql } from '@apollo/client';


export const REMOVE_USER_FROM_GROUP = gql`
  mutation RemoveUserFromGroup(
    $userId: ID!,
    $groupId: ID!
  ) {
    removeUserFromGroup(
      userId: $userId,
      groupId: $groupId
    ) {
      membership {
        group {
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
        user {
          id
          groups {
            totalCount
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
