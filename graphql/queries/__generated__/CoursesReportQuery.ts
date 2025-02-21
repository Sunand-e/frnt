/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageInfo } from "./PageInfo";

// ====================================================
// GraphQL query operation: CoursesReportQuery
// ====================================================

export interface CoursesReportQuery_courses_edges_node_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface CoursesReportQuery_courses_edges_node_tags {
  __typename: "Tag";
  id: string;
  label: string;
}

export interface CoursesReportQuery_courses_edges_node_users_edges_node {
  __typename: "User";
  id: string;
}

export interface CoursesReportQuery_courses_edges_node_users_edges {
  __typename: "ContentUserEdge";
  score: number | null;
  status: string | null;
  /**
   * The item at the end of the edge.
   */
  node: CoursesReportQuery_courses_edges_node_users_edges_node | null;
}

export interface CoursesReportQuery_courses_edges_node_users {
  __typename: "ContentUserConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (CoursesReportQuery_courses_edges_node_users_edges | null)[] | null;
}

export interface CoursesReportQuery_courses_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  _deleted: boolean;
  image: CoursesReportQuery_courses_edges_node_image | null;
  tags: CoursesReportQuery_courses_edges_node_tags[] | null;
  users: CoursesReportQuery_courses_edges_node_users | null;
}

export interface CoursesReportQuery_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: CoursesReportQuery_courses_edges_node | null;
}

export interface CoursesReportQuery_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (CoursesReportQuery_courses_edges | null)[] | null;
  pageInfo: (PageInfo | null) | null;
}

export interface CoursesReportQuery {
  /**
   * Get list of all courses
   */
  courses: CoursesReportQuery_courses;
}
