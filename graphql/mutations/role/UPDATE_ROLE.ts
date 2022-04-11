import { gql } from '@apollo/client';
import { RoleFragment } from '../../queries/roles';


export const UPDATE_ROLE = gql`
  mutation UpdateRole(
    $id: ID!
    $name: String,
    $roleType: String,
    $capabilityIds: [ID!]
  ) {
    updateRole(
      input: {
        id: $id,
        name: $name,
        roleType: $roleType,
        capabilityIds: $capabilityIds
      }
    ) {
      role {
      ...RoleFragment
      }
    }
  }
  ${RoleFragment}
`;
