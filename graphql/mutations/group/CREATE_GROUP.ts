import { gql } from '@apollo/client';


export const CREATE_GROUP = gql`
  mutation CreateGroup(
    $name: String!,
    $parentId: ID
  ) {
    createGroup(
      input: {
        name: $name,
        parentId: $parentId
      }
    ) {
      group {
        createdAt
        id
        name
        updatedAt
        users {
          id
        }
      }
    }
  }
`;
