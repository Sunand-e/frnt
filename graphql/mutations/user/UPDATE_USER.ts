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
    $mfaEnabled: Boolean
    $otpSecret: String
    $otpSecretVerified: Boolean
    $phoneNumber: String
    $otpVerifiedToken: String
  ) {
    updateUser(
      input: {
        id: $id,
        firstName: $firstName,
        lastName: $lastName,
        userType: $userType,
        email: $email,
        status: $status,
        mfaEnabled: $mfaEnabled,
        otpSecret: $otpSecret,
        otpSecretVerified: $otpSecretVerified
        phoneNumber: $phoneNumber
        otpVerifiedToken: $otpVerifiedToken
      }
    ) {
      user {
      ...UserFragment
      }
    }
  }
  ${UserFragment}
`;
