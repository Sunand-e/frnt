/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RevokeShareContentItems
// ====================================================

export interface RevokeShareContentItems_revokeShareContentItems {
  __typename: "RevokeShareContentItemsPayload";
  message: string;
}

export interface RevokeShareContentItems {
  /**
   * To revoke the shared course between the tenants
   */
  revokeShareContentItems: RevokeShareContentItems_revokeShareContentItems | null;
}

export interface RevokeShareContentItemsVariables {
  contentItemIds: string[];
  tenantId: string;
}
