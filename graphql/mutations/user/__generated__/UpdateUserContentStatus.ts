/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserContentStatus
// ====================================================

export interface UpdateUserContentStatus_updateUserContentStatus_userContents_edges_node {
  __typename: "ContentItem";
  id: string;
  itemType: string;
}

export interface UpdateUserContentStatus_updateUserContentStatus_userContents_edges {
  __typename: "UserContentEdge";
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
  node: UpdateUserContentStatus_updateUserContentStatus_userContents_edges_node | null;
}

export interface UpdateUserContentStatus_updateUserContentStatus_userContents {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UpdateUserContentStatus_updateUserContentStatus_userContents_edges | null)[] | null;
}

export interface UpdateUserContentStatus_updateUserContentStatus {
  __typename: "UserContentStatusUpdatePayload";
  userContents: UpdateUserContentStatus_updateUserContentStatus_userContents | null;
}

export interface UpdateUserContentStatus {
  updateUserContentStatus: UpdateUserContentStatus_updateUserContentStatus | null;
}

export interface UpdateUserContentStatusVariables {
  userId?: string | null;
  contentItemId: string;
  status?: string | null;
  lastVisited?: any | null;
  firstVisited?: any | null;
  score?: number | null;
  visits?: number | null;
  completed?: boolean | null;
}
