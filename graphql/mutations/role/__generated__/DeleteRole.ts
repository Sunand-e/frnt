/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteRole
// ====================================================

export interface DeleteRole_deleteRole_role {
  __typename: "Role";
  id: string;
  _deleted: boolean;
}

export interface DeleteRole_deleteRole {
  __typename: "DeleteRolePayload";
  role: DeleteRole_deleteRole_role;
  message: string;
}

export interface DeleteRole {
  deleteRole: DeleteRole_deleteRole | null;
}

export interface DeleteRoleVariables {
  id: string;
}
