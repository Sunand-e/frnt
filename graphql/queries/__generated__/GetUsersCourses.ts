/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsersCourses
// ====================================================

export interface GetUsersCourses_users_edges_node_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUsersCourses_users_edges_node_courses_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetUsersCourses_users_edges_node_courses_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
  mediaItem: GetUsersCourses_users_edges_node_courses_edges_node_mediaItem | null;
}

export interface GetUsersCourses_users_edges_node_courses_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUsersCourses_users_edges_node_courses_edges_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetUsersCourses_users_edges_node_courses_edges_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUsersCourses_users_edges_node_courses_edges_groups_edges_node | null;
}

export interface GetUsersCourses_users_edges_node_courses_edges_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetUsersCourses_users_edges_node_courses_edges_groups_edges | null)[] | null;
}

export interface GetUsersCourses_users_edges_node_courses_edges {
  __typename: "UserContentEdge";
  userId: string | null;
  /**
   * The item at the end of the edge.
   */
  node: GetUsersCourses_users_edges_node_courses_edges_node | null;
  roles: GetUsersCourses_users_edges_node_courses_edges_roles[] | null;
  groups: GetUsersCourses_users_edges_node_courses_edges_groups | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUsersCourses_users_edges_node_courses {
  __typename: "UserContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetUsersCourses_users_edges_node_courses_edges | null)[] | null;
}

export interface GetUsersCourses_users_edges_node {
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
  roles: GetUsersCourses_users_edges_node_roles[] | null;
  courses: GetUsersCourses_users_edges_node_courses | null;
}

export interface GetUsersCourses_users_edges {
  __typename: "UserEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUsersCourses_users_edges_node | null;
}

export interface GetUsersCourses_users {
  __typename: "UserConnection";
  /**
   * A list of edges.
   */
  edges: (GetUsersCourses_users_edges | null)[] | null;
}

export interface GetUsersCourses {
  /**
   * Get list of all users
   */
  users: GetUsersCourses_users;
}
