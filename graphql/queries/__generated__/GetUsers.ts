/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users_courses {
  __typename: "ContentItem";
  id: string;
}

export interface GetUsers_users {
  __typename: "User";
  createdAt: any;
  email: string;
  firstName: string | null;
  fullName: string | null;
  id: string;
  lastName: string | null;
  status: string;
  updatedAt: any;
  userType: string | null;
  courses: GetUsers_users_courses[] | null;
}

export interface GetUsers {
  /**
   * Get list of all users
   */
  users: GetUsers_users[];
}
