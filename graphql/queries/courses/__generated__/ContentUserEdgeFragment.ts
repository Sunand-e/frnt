/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentUserEdgeFragment
// ====================================================

export interface ContentUserEdgeFragment_edges_node_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface ContentUserEdgeFragment_edges_node {
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
  roles: ContentUserEdgeFragment_edges_node_roles[] | null;
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
  createdAt: any | null;
  updatedAt: any | null;
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
