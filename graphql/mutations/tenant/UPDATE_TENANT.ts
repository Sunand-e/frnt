import { gql } from '@apollo/client';
import { TenantFragment } from '../../queries/tenants';


export const UPDATE_TENANT = gql`
  mutation UpdateTenant(
    $id: ID!,
    $name: String,
    $shortName: String,
    $parentId: ID,
    $settings: JSON,
    $url: String
  ) {
    updateTenant(
      input: {
        id: $id,
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
