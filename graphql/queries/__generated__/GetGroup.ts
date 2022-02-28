/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGroup
// ====================================================

export interface GetGroup_group_users {
  __typename: "User";
  id: string;
}

export interface GetGroup_group_enrolledCourses {
  __typename: "ContentItem";
  id: string;
}

export interface GetGroup_group_assignedCourses {
  __typename: "ContentItem";
  id: string;
}

export interface GetGroup_group {
  __typename: "Group";
  createdAt: any;
  id: string;
  name: string | null;
  updatedAt: any;
  users: GetGroup_group_users[];
  enrolledCourses: GetGroup_group_enrolledCourses[];
  assignedCourses: GetGroup_group_assignedCourses[];
  _deleted: boolean;
}

export interface GetGroup {
  /**
   * Get an Group based on id
   */
  group: GetGroup_group;
}

export interface GetGroupVariables {
  id: string;
}
