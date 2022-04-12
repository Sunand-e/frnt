import { gql } from '@apollo/client';
import { UserFragment } from '../../queries/users';


export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $userType: String
    $status: String
  ) {
    updateUser(
      input: {
      id: $id,
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      userType: $userType,
      status: $status
      }
    ) {
      user {
      ...UserFragment
      }
    }
  }
  ${UserFragment}
`;
