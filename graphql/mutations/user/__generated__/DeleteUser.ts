/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteUser
// ====================================================

export interface DeleteUser_deleteUser_user {
  __typename: "User";
  id: string;
  _deleted: boolean;
}

export interface DeleteUser_deleteUser {
  __typename: "DeleteUserPayload";
  user: DeleteUser_deleteUser_user;
}

export interface DeleteUser {
  deleteUser: DeleteUser_deleteUser | null;
}

export interface DeleteUserVariables {
  id: string;
}
