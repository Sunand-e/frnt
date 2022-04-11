/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveRoleFromUser
// ====================================================

export interface RemoveRoleFromUser_removeRoleFromUser {
  __typename: "RemoveRoleFromUserPayload";
  message: string;
}

export interface RemoveRoleFromUser {
  removeRoleFromUser: RemoveRoleFromUser_removeRoleFromUser | null;
}

export interface RemoveRoleFromUserVariables {
  roleId: string;
  userId: string;
}
