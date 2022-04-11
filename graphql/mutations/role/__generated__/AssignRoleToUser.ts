/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AssignRoleToUser
// ====================================================

export interface AssignRoleToUser_assignRoleToUser {
  __typename: "AssignRoleToUserPayload";
  message: string;
}

export interface AssignRoleToUser {
  assignRoleToUser: AssignRoleToUser_assignRoleToUser | null;
}

export interface AssignRoleToUserVariables {
  roleId: string;
  userId: string;
}
