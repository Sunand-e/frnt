/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllContent
// ====================================================

export interface GetAllContent_courses_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetAllContent_courses {
  __typename: "ContentItem";
  title: string | null;
  image: GetAllContent_courses_image | null;
}

export interface GetAllContent {
  /**
   * Get list of all courses
   */
  courses: GetAllContent_courses[];
}
