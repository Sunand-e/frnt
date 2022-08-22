/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserWelcome
// ====================================================

export interface GetUserWelcome_user {
  __typename: "User";
  fullName: string | null;
}

export interface GetUserWelcome {
  /**
   * Get an user based on id
   */
  user: GetUserWelcome_user;
}
