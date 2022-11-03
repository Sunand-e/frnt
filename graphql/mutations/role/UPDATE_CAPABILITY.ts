import { gql } from '@apollo/client';
import { CapabilityFragment } from '../../queries/capabilities';

export const UPDATE_CAPABILITY = gql`
  mutation UpdateCapability(
    $id: ID!
    $details: JSON
  ) {
    updateCapability(
      input: {
        id: $id,
        details: $details
      }
    ) {
      capability {
      ...CapabilityFragment
      }
    }
  }
  ${CapabilityFragment}
`;
