/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAdminDashboardData
// ====================================================

export interface GetAdminDashboardData_users {
  __typename: "UserConnection";
  totalCount: number;
}

export interface GetAdminDashboardData_groups {
  __typename: "GroupConnection";
  totalCount: number;
}

export interface GetAdminDashboardData_courses {
  __typename: "ContentItemConnection";
  totalCount: number;
}

export interface GetAdminDashboardData_libraryItems {
  __typename: "ContentItemConnection";
  totalCount: number;
}

export interface GetAdminDashboardData {
  /**
   * Get list of all users
   */
  users: GetAdminDashboardData_users;
  /**
   * Get list of all Groups
   */
  groups: GetAdminDashboardData_groups;
  /**
   * Get list of all courses
   */
  courses: GetAdminDashboardData_courses;
  /**
   * Get list of all library_items
   */
  libraryItems: GetAdminDashboardData_libraryItems;
}
