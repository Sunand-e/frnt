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
  roleType: string;
}

export interface GetUsers_users_courses_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetUsers_users_courses_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetUsers_users_courses_edges_node_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetUsers_users_courses_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetUsers_users_courses_edges_node_image | null;
  id: string;
  icon: GetUsers_users_courses_edges_node_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetUsers_users_courses_edges_node_users | null;
  _deleted: boolean;
}

export interface GetUsers_users_courses_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUsers_users_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUsers_users_courses_edges_node | null;
  roles: GetUsers_users_courses_edges_roles[] | null;
  lastVisited: any | null;
  completed: boolean | null;
  score: number | null;
  status: string | null;
  visits: number | null;
}

export interface GetUsers_users_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUsers_users_courses_edges | null)[] | null;
}

export interface GetUsers_users_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetUsers_users_groups_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUsers_users_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUsers_users_groups_edges_node | null;
  roles: GetUsers_users_groups_edges_roles[] | null;
}

export interface GetUsers_users_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetUsers_users_groups_edges | null)[] | null;
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
  groups: GetUsers_users_groups | null;
}

export interface GetUsers {
  /**
   * Get list of all users
   */
  users: GetUsers_users[];
}
