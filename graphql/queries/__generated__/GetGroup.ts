/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGroup
// ====================================================

export interface GetGroup_group_users_edges_node {
  __typename: "User";
  id: string;
}

export interface GetGroup_group_users_edges {
  __typename: "GroupUserEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetGroup_group_users_edges_node | null;
}

export interface GetGroup_group_users {
  __typename: "GroupUserConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetGroup_group_users_edges | null)[] | null;
}

export interface GetGroup_group_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetGroup_group_enrolledCourses_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface GetGroup_group_enrolledCourses_edges {
  __typename: "GroupEnrolledContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetGroup_group_enrolledCourses_edges_node | null;
}

export interface GetGroup_group_enrolledCourses {
  __typename: "GroupEnrolledContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetGroup_group_enrolledCourses_edges | null)[] | null;
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
  users: GetGroup_group_users;
  image: GetGroup_group_image | null;
  enrolledCourses: GetGroup_group_enrolledCourses;
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
