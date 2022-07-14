/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllContent
// ====================================================

export interface GetAllContent_courses_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetAllContent_courses_edges_node {
  __typename: "ContentItem";
  title: string | null;
  image: GetAllContent_courses_edges_node_image | null;
}

export interface GetAllContent_courses_edges {
  __typename: "ContentItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetAllContent_courses_edges_node | null;
}

export interface GetAllContent_courses {
  __typename: "ContentItemConnection";
  /**
   * A list of edges.
   */
  edges: (GetAllContent_courses_edges | null)[] | null;
}

export interface GetAllContent {
  /**
   * Get list of all courses
   */
  courses: GetAllContent_courses;
}
