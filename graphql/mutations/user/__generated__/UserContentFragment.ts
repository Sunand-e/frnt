/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserContentFragment
// ====================================================

export interface UserContentFragment_edges_node {
  __typename: "ContentItem";
  id: string;
  itemType: string;
}

export interface UserContentFragment_edges {
  __typename: "UserContentEdge";
  userId: string | null;
  status: string | null;
  score: number | null;
  updatedAt: any | null;
  completed: boolean | null;
  properties: any | null;
  lastVisited: any | null;
  firstVisited: any | null;
  /**
   * The item at the end of the edge.
   */
  node: UserContentFragment_edges_node | null;
}

export interface UserContentFragment {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UserContentFragment_edges | null)[] | null;
}
