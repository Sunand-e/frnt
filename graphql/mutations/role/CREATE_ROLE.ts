import { gql } from '@apollo/client';
import { RoleFragment } from '../../queries/roles';


export const CREATE_ROLE = gql`
  mutation CreateRole(
    $name: String!,
    $displayName: String!,
    $roleType: String!,
    $capabilityIds: [ID!]
  ) {
    createRole(
      input: {
        name: $name,
        displayName: $displayName,
        roleType: $roleType,
        capabilityIds: $capabilityIds
      }
    ) {
      role {
        ...RoleFragment
      }
      message
    }
  }
  ${RoleFragment}
`;
