/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RoleFragment
// ====================================================

export interface RoleFragment_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface RoleFragment {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
  capabilities: RoleFragment_capabilities[] | null;
  _deleted: boolean;
}
