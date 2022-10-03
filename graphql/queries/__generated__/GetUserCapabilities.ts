/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserCapabilities
// ====================================================

export interface GetUserCapabilities_user_roles_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface GetUserCapabilities_user_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
  capabilities: GetUserCapabilities_user_roles_capabilities[] | null;
}

export interface GetUserCapabilities_user_courses_edges_roles_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface GetUserCapabilities_user_courses_edges_roles {
  __typename: "Role";
  id: string;
  capabilities: GetUserCapabilities_user_courses_edges_roles_capabilities[] | null;
}

export interface GetUserCapabilities_user_courses_edges {
  __typename: "UserContentEdge";
  roles: GetUserCapabilities_user_courses_edges_roles[] | null;
}

export interface GetUserCapabilities_user_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserCapabilities_user_courses_edges | null)[] | null;
}

export interface GetUserCapabilities_user_groups_edges_roles_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface GetUserCapabilities_user_groups_edges_roles {
  __typename: "Role";
  id: string;
  capabilities: GetUserCapabilities_user_groups_edges_roles_capabilities[] | null;
}

export interface GetUserCapabilities_user_groups_edges {
  __typename: "UserGroupEdge";
  roles: GetUserCapabilities_user_groups_edges_roles[] | null;
}

export interface GetUserCapabilities_user_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserCapabilities_user_groups_edges | null)[] | null;
}

export interface GetUserCapabilities_user {
  __typename: "User";
  id: string;
  userType: string | null;
  roles: GetUserCapabilities_user_roles[] | null;
  courses: GetUserCapabilities_user_courses | null;
  groups: GetUserCapabilities_user_groups | null;
}

export interface GetUserCapabilities {
  /**
   * Get an user based on id
   */
  user: GetUserCapabilities_user;
}
