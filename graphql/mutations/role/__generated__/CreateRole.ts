/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateRole
// ====================================================

export interface CreateRole_createRole_role_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface CreateRole_createRole_role {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
  capabilities: CreateRole_createRole_role_capabilities[] | null;
  _deleted: boolean;
}

export interface CreateRole_createRole {
  __typename: "CreateRolePayload";
  role: CreateRole_createRole_role | null;
  message: string;
}

export interface CreateRole {
  createRole: CreateRole_createRole | null;
}

export interface CreateRoleVariables {
  name: string;
  roleType: string;
  capabilityIds?: string[] | null;
}
