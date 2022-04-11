import { gql } from '@apollo/client';
import { RoleFragment } from '../../queries/roles';


export const CREATE_ROLE = gql`
  mutation CreateRole(
    $name: String!,
    $roleType: String!,
    $capabilityIds: [ID!]
  ) {
    createRole(
      input: {
        name: $name,
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
