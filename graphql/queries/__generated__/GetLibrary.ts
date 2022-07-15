/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLibrary
// ====================================================

export interface GetLibrary_libraryItems_edges_node {
  __typename: "ContentItem";
  title: string | null;
}

export interface GetLibrary_libraryItems_edges {
  __typename: "ContentItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetLibrary_libraryItems_edges_node | null;
}

export interface GetLibrary_libraryItems {
  __typename: "ContentItemConnection";
  /**
   * A list of edges.
   */
  edges: (GetLibrary_libraryItems_edges | null)[] | null;
}

export interface GetLibrary {
  /**
   * Get list of all library_items
   */
  libraryItems: GetLibrary_libraryItems;
}
