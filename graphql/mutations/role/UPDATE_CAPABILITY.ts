import { gql } from '@apollo/client';
import { CapabilityFragment } from '../../queries/capabilities';

export const UPDATE_CAPABILITY = gql`
  mutation UpdateCapability(
    $id: ID!
    $displayName: String
    $capabilityType: String
  ) {
    updateCapability(
      input: {
        id: $id,
        capabilityType: $capabilityType
        displayName: $displayName
      }
    ) {
      capability {
      ...CapabilityFragment
      }
    }
  }
  ${CapabilityFragment}
`;
