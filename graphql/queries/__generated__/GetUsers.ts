/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageInfo } from "./PageInfo";

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users_edges_node_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUsers_users_edges_node_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetUsers_users_edges_node_groups_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
}

export interface GetUsers_users_edges_node_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUsers_users_edges_node_groups_edges_node | null;
  roles: GetUsers_users_edges_node_groups_edges_roles[] | null;
}

export interface GetUsers_users_edges_node_groups {
  __typename: "UserGroupConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetUsers_users_edges_node_groups_edges | null)[] | null;
}

export interface GetUsers_users_edges_node {
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
  roles: GetUsers_users_edges_node_roles[] | null;
  groups: GetUsers_users_edges_node_groups | null;
}

export interface GetUsers_users_edges {
  __typename: "UserEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUsers_users_edges_node | null;
}

export interface GetUsers_users {
  totalCount: number;
  __typename: "UserConnection";
  /**
   * A list of edges.
   */
  edges: (GetUsers_users_edges | null)[] | null;
  pageInfo: (PageInfo | null) | null;
}

export interface GetUsers {
  /**
   * Get list of all users
   */
  users: GetUsers_users;
}
