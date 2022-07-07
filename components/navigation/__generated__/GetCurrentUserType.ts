/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrentUserType
// ====================================================

export interface GetCurrentUserType_user {
  __typename: "User";
  userType: string | null;
}

export interface GetCurrentUserType {
  /**
   * Get an user based on id
   */
  user: GetCurrentUserType_user;
}
