/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentUserEdgeFragment
// ====================================================

export interface ContentUserEdgeFragment_edges_node {
  __typename: "User";
  id: string;
}

export interface ContentUserEdgeFragment_edges {
  __typename: "ContentUserEdge";
  /**
   * The item at the end of the edge.
   */
  node: ContentUserEdgeFragment_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any;
  updatedAt: any;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface ContentUserEdgeFragment {
  __typename: "ContentUserConnection";
  /**
   * A list of edges.
   */
  edges: (ContentUserEdgeFragment_edges | null)[] | null;
}
