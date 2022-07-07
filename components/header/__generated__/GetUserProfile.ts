/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserProfile
// ====================================================

export interface GetUserProfile_user_roles {
  __typename: "Role";
  name: string | null;
}

export interface GetUserProfile_user {
  __typename: "User";
  fullName: string | null;
  roles: GetUserProfile_user_roles[] | null;
}

export interface GetUserProfile {
  /**
   * Get an user based on id
   */
  user: GetUserProfile_user;
}
