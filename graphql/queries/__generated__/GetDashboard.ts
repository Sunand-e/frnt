/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDashboard
// ====================================================

export interface GetDashboard_courses_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetDashboard_courses_edges_node {
  __typename: "ContentItem";
  title: string | null;
  image: GetDashboard_courses_edges_node_image | null;
}

export interface GetDashboard_courses_edges {
  __typename: "ContentItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetDashboard_courses_edges_node | null;
}

export interface GetDashboard_courses {
  __typename: "ContentItemConnection";
  /**
   * A list of edges.
   */
  edges: (GetDashboard_courses_edges | null)[] | null;
}

export interface GetDashboard_libraryItems_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetDashboard_libraryItems_edges_node {
  __typename: "ContentItem";
  title: string | null;
  image: GetDashboard_libraryItems_edges_node_image | null;
}

export interface GetDashboard_libraryItems_edges {
  __typename: "ContentItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetDashboard_libraryItems_edges_node | null;
}

export interface GetDashboard_libraryItems {
  __typename: "ContentItemConnection";
  /**
   * A list of edges.
   */
  edges: (GetDashboard_libraryItems_edges | null)[] | null;
}

export interface GetDashboard {
  /**
   * Get list of all courses
   */
  courses: GetDashboard_courses;
  /**
   * Get list of all library_items
   */
  libraryItems: GetDashboard_libraryItems;
}
