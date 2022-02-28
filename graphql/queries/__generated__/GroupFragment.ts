/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupFragment
// ====================================================

export interface GroupFragment_users {
  __typename: "User";
  id: string;
}

export interface GroupFragment_enrolledCourses {
  __typename: "ContentItem";
  id: string;
}

export interface GroupFragment_assignedCourses {
  __typename: "ContentItem";
  id: string;
}

export interface GroupFragment {
  __typename: "Group";
  createdAt: any;
  id: string;
  name: string | null;
  updatedAt: any;
  users: GroupFragment_users[];
  enrolledCourses: GroupFragment_enrolledCourses[];
  assignedCourses: GroupFragment_assignedCourses[];
  _deleted: boolean;
}
