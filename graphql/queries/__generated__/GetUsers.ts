/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users_roles {
  __typename: "Role";
  id: string;
  name: string | null;
}

export interface GetUsers_users_courses_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface GetUsers_users_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUsers_users_courses_edges_node | null;
}

export interface GetUsers_users_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUsers_users_courses_edges | null)[] | null;
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
  roles: GetUsers_users_roles[] | null;
  courses: GetUsers_users_courses | null;
}

export interface GetUsers {
  /**
   * Get list of all users
   */
  users: GetUsers_users[];
}
