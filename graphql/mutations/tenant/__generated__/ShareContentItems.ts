/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ShareContentItems
// ====================================================

export interface ShareContentItems_shareContentItems {
  __typename: "ShareContentItemsPayload";
  message: string;
}

export interface ShareContentItems {
  /**
   * TO share the content between the Tenants
   */
  shareContentItems: ShareContentItems_shareContentItems | null;
}

export interface ShareContentItemsVariables {
  contentItemIds: string[];
  tenantId: string;
}
