/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserDataForScorm
// ====================================================

export interface GetUserDataForScorm_user {
  __typename: "User";
  fullName: string | null;
  id: string;
}

export interface GetUserDataForScorm {
  /**
   * Get an user based on id
   */
  user: GetUserDataForScorm_user;
}
