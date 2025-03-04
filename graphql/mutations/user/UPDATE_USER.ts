import { gql } from '@apollo/client';
import { UserFragment } from '../../queries/users';


export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $userType: String
    $status: String
    $mfaEnabled: Boolean
    $otpSecret: String
    $otpSecretVerified: Boolean
  ) {
    updateUser(
      input: {
        id: $id,
        firstName: $firstName,
        lastName: $lastName,
        userType: $userType,
        status: $status,
        mfaEnabled: $mfaEnabled,
        otpSecret: $otpSecret,
        otpSecretVerified: $otpSecretVerified
      }
    ) {
      user {
      ...UserFragment
      }
    }
  }
  ${UserFragment}
`;
