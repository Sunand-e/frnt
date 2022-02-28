import { gql } from '@apollo/client';


export const ADD_USERS_TO_GROUPS = gql`
  mutation AddUsersToGroups(
    $userIds: [ID!]!,
    $groupIds: [ID!]!
  ) {
    addUsersToGroups(
      userIds: $userIds,
      groupIds: $groupIds
    ) {
      groups {
        id
        name
        users {
          id
        }
      }
    }
  }
`;
