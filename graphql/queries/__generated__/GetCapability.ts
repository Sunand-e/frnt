/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCapability
// ====================================================

export interface GetCapability_capability {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface GetCapability {
  /**
   * Get an capability based on id
   */
  capability: GetCapability_capability;
}

export interface GetCapabilityVariables {
  id: string;
}
