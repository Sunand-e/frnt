/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupFragment
// ====================================================

export interface GroupFragment_users_edges_node {
  __typename: "User";
  id: string;
}

export interface GroupFragment_users_edges {
  __typename: "GroupUserEdge";
  /**
   * The item at the end of the edge.
   */
  node: GroupFragment_users_edges_node | null;
}

export interface GroupFragment_users {
  __typename: "GroupUserConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GroupFragment_users_edges | null)[] | null;
}

export interface GroupFragment_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GroupFragment_enrolledCourses_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface GroupFragment_enrolledCourses_edges {
  __typename: "GroupEnrolledContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GroupFragment_enrolledCourses_edges_node | null;
}

export interface GroupFragment_enrolledCourses {
  __typename: "GroupEnrolledContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GroupFragment_enrolledCourses_edges | null)[] | null;
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
  users: GroupFragment_users;
  image: GroupFragment_image | null;
  enrolledCourses: GroupFragment_enrolledCourses;
  assignedCourses: GroupFragment_assignedCourses[];
  _deleted: boolean;
}
