import { gql } from '@apollo/client';


export const ASSIGN_CAPABILITY_TO_ROLE = gql`
  mutation AssignCapabilityToRole(
    $capabilityId: ID!
    $roleId: ID!
  ) {
    assignCapabilityToRole(
      capabilityId: $capabilityId,
      roleId: $roleId
    ) {
      message
    }
  }
`;
