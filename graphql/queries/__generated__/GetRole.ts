/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRole
// ====================================================

export interface GetRole_role_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface GetRole_role {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
  capabilities: GetRole_role_capabilities[] | null;
  _deleted: boolean;
}

export interface GetRole {
  /**
   * Get an Role based on id
   */
  role: GetRole_role;
}

export interface GetRoleVariables {
  id: string;
}
