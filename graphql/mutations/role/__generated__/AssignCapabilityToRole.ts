/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AssignCapabilityToRole
// ====================================================

export interface AssignCapabilityToRole_assignCapabilityToRole {
  __typename: "AssignCapabilityToRolePayload";
  message: string;
}

export interface AssignCapabilityToRole {
  assignCapabilityToRole: AssignCapabilityToRole_assignCapabilityToRole | null;
}

export interface AssignCapabilityToRoleVariables {
  capabilityId: string;
  roleId: string;
}
