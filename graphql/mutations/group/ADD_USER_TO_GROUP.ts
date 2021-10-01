import { gql } from '@apollo/client';


export const ADD_USER_TO_GROUP = gql`
  mutation AddUserToGroup(
    $userId: ID!,
    $isGroupLeader: Boolean,
    $groupId: ID!
  ) {
    addUserToGroup(
      input: {
        userId: $userId,
        isGroupLeader: $isGroupLeader,
        groupId: $groupId
        }
    ) {
      membership {
        group {
          id
        }
      }
    }
  }
`;
