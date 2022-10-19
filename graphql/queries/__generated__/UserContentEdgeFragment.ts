/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserContentEdgeFragment
// ====================================================

export interface UserContentEdgeFragment_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface UserContentEdgeFragment_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
  mediaItem: UserContentEdgeFragment_edges_node_mediaItem | null;
}

export interface UserContentEdgeFragment_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface UserContentEdgeFragment_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: UserContentEdgeFragment_edges_node | null;
  roles: UserContentEdgeFragment_edges_roles[] | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface UserContentEdgeFragment {
  __typename: "UserContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (UserContentEdgeFragment_edges | null)[] | null;
}
