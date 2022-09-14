/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserContentStatus
// ====================================================

export interface UpdateUserContentStatus_updateUserContentStatus_user_courses_edges_node_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user_courses_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  tags: UpdateUserContentStatus_updateUserContentStatus_user_courses_edges_node_tags[] | null;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: UpdateUserContentStatus_updateUserContentStatus_user_courses_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UpdateUserContentStatus_updateUserContentStatus_user_courses_edges | null)[] | null;
  totalCount: number;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user_sections_edges_node_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user_sections_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  tags: UpdateUserContentStatus_updateUserContentStatus_user_sections_edges_node_tags[] | null;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user_sections_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: UpdateUserContentStatus_updateUserContentStatus_user_sections_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user_sections {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UpdateUserContentStatus_updateUserContentStatus_user_sections_edges | null)[] | null;
  totalCount: number;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user_lessons_edges_node_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user_lessons_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  tags: UpdateUserContentStatus_updateUserContentStatus_user_lessons_edges_node_tags[] | null;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user_lessons_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: UpdateUserContentStatus_updateUserContentStatus_user_lessons_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user_lessons {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UpdateUserContentStatus_updateUserContentStatus_user_lessons_edges | null)[] | null;
  totalCount: number;
}

export interface UpdateUserContentStatus_updateUserContentStatus_user {
  __typename: "User";
  id: string;
  courses: UpdateUserContentStatus_updateUserContentStatus_user_courses | null;
  sections: UpdateUserContentStatus_updateUserContentStatus_user_sections | null;
  lessons: UpdateUserContentStatus_updateUserContentStatus_user_lessons | null;
}

export interface UpdateUserContentStatus_updateUserContentStatus {
  __typename: "UserContentStatusUpdatePayload";
  user: UpdateUserContentStatus_updateUserContentStatus_user;
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
