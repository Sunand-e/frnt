import { gql } from "@apollo/client";

export const GET_GROUP_USERS = gql`
  query GetGroupUsers {
    groups {
      edges {
        node {
          provisionedContents {
            edges {
              node {
                id
              }
            }
          }
          assignedContents {
            edges {
              node {
                id
              }
            }
          }
          id
          users {
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
  }
`;
