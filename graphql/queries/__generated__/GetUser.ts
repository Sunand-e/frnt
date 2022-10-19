/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUser_user_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetUser_user_groups_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUser_user_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUser_user_groups_edges_node | null;
  roles: GetUser_user_groups_edges_roles[] | null;
}

export interface GetUser_user_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetUser_user_groups_edges | null)[] | null;
}

export interface GetUser_user {
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
  profileImageUrl: string | null;
  roles: GetUser_user_roles[] | null;
  groups: GetUser_user_groups | null;
}

export interface GetUser {
  /**
   * Get an user based on id
   */
  user: GetUser_user;
}

export interface GetUserVariables {
  id?: string | null;
}
