import { gql } from '@apollo/client';
import { TenantFragment } from '../../queries/tenants';

export const CREATE_TENANT = gql`
  mutation CreateTenant(
    $name: String!,
    $shortName: String!,
    $parentId: ID,
    $settings: JSON,
    $url: String!
  ) {
    createTenant(
      input: {
        name: $name,
        shortName: $shortName,
        parentId: $parentId,
        settings: $settings,
        url: $url
      }
    ) {
      tenant {
        ...TenantFragment
      }
    }
  }
  ${TenantFragment}
`;
