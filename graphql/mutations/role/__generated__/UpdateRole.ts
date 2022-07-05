/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateRole
// ====================================================

export interface UpdateRole_updateRole_role {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
  _deleted: boolean;
}

export interface UpdateRole_updateRole {
  __typename: "UpdateRolePayload";
  role: UpdateRole_updateRole_role;
}

export interface UpdateRole {
  updateRole: UpdateRole_updateRole | null;
}

export interface UpdateRoleVariables {
  id: string;
  name?: string | null;
  roleType?: string | null;
  capabilityIds?: string[] | null;
}
