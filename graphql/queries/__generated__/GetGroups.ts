/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGroups
// ====================================================

export interface GetGroups_groups_users {
  __typename: "User";
  id: string;
}

export interface GetGroups_groups {
  __typename: "Group";
  createdAt: any;
  id: string;
  name: string | null;
  updatedAt: any;
  users: GetGroups_groups_users[];
}

export interface GetGroups {
  /**
   * Get list of all Groups
   */
  groups: GetGroups_groups[];
}
