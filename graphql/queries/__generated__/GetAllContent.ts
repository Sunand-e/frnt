/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllContent
// ====================================================

export interface GetAllContent_courses {
  __typename: "ContentItem";
  title: string | null;
}

export interface GetAllContent {
  /**
   * Get list of all courses
   */
  courses: GetAllContent_courses[];
}
