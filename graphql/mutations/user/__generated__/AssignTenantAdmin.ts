/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AssignTenantAdmin
// ====================================================

export interface AssignTenantAdmin_assignTenantAdmin_user {
  __typename: "User";
  id: string;
}

export interface AssignTenantAdmin_assignTenantAdmin {
  __typename: "AssignTaUserPayload";
  user: AssignTenantAdmin_assignTenantAdmin_user;
}

export interface AssignTenantAdmin {
  assignTenantAdmin: AssignTenantAdmin_assignTenantAdmin | null;
}

export interface AssignTenantAdminVariables {
  userType: string;
  id: string;
}
