/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTenantSharedItems
// ====================================================

export interface GetTenantSharedItems_courses_edges_node {
  __typename: "ContentItem";
  title: string | null;
  id: string;
}

export interface GetTenantSharedItems_courses_edges {
  __typename: "ContentItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetTenantSharedItems_courses_edges_node | null;
}

export interface GetTenantSharedItems_courses {
  __typename: "ContentItemConnection";
  /**
   * A list of edges.
   */
  edges: (GetTenantSharedItems_courses_edges | null)[] | null;
}

export interface GetTenantSharedItems_pathways_edges_node {
  __typename: "ContentItem";
  title: string | null;
  id: string;
}

export interface GetTenantSharedItems_pathways_edges {
  __typename: "ContentItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetTenantSharedItems_pathways_edges_node | null;
}

export interface GetTenantSharedItems_pathways {
  __typename: "ContentItemConnection";
  /**
   * A list of edges.
   */
  edges: (GetTenantSharedItems_pathways_edges | null)[] | null;
}

export interface GetTenantSharedItems_libraryItems_edges_node {
  __typename: "ContentItem";
  title: string | null;
  id: string;
}

export interface GetTenantSharedItems_libraryItems_edges {
  __typename: "ContentItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetTenantSharedItems_libraryItems_edges_node | null;
}

export interface GetTenantSharedItems_libraryItems {
  __typename: "ContentItemConnection";
  /**
   * A list of edges.
   */
  edges: (GetTenantSharedItems_libraryItems_edges | null)[] | null;
}

export interface GetTenantSharedItems {
  /**
   * Get list of all courses
   */
  courses: GetTenantSharedItems_courses;
  /**
   * Get list of all pathways
   */
  pathways: GetTenantSharedItems_pathways;
  /**
   * Get list of all library_items
   */
  libraryItems: GetTenantSharedItems_libraryItems;
}

export interface GetTenantSharedItemsVariables {
  where: any;
}
