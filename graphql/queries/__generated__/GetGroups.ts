/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGroups
// ====================================================

export interface GetGroups_groups_edges_node_users_edges_node {
  __typename: "User";
  id: string;
}

export interface GetGroups_groups_edges_node_users_edges {
  __typename: "GroupUserEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetGroups_groups_edges_node_users_edges_node | null;
}

export interface GetGroups_groups_edges_node_users {
  __typename: "GroupUserConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetGroups_groups_edges_node_users_edges | null)[] | null;
}

export interface GetGroups_groups_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetGroups_groups_edges_node_enrolledCourses_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface GetGroups_groups_edges_node_enrolledCourses_edges {
  __typename: "GroupEnrolledContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetGroups_groups_edges_node_enrolledCourses_edges_node | null;
}

export interface GetGroups_groups_edges_node_enrolledCourses {
  __typename: "GroupEnrolledContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetGroups_groups_edges_node_enrolledCourses_edges | null)[] | null;
}

export interface GetGroups_groups_edges_node_assignedCourses {
  __typename: "ContentItem";
  id: string;
}

export interface GetGroups_groups_edges_node {
  __typename: "Group";
  createdAt: any;
  id: string;
  name: string | null;
  updatedAt: any;
  users: GetGroups_groups_edges_node_users;
  image: GetGroups_groups_edges_node_image | null;
  enrolledCourses: GetGroups_groups_edges_node_enrolledCourses;
  assignedCourses: GetGroups_groups_edges_node_assignedCourses[];
  _deleted: boolean;
}

export interface GetGroups_groups_edges {
  __typename: "GroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetGroups_groups_edges_node | null;
}

export interface GetGroups_groups {
  __typename: "GroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetGroups_groups_edges | null)[] | null;
}

export interface GetGroups {
  /**
   * Get list of all Groups
   */
  groups: GetGroups_groups;
}
