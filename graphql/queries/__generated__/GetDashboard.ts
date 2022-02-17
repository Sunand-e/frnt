/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDashboard
// ====================================================

export interface GetDashboard_courses_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetDashboard_courses {
  __typename: "ContentItem";
  title: string | null;
  image: GetDashboard_courses_image | null;
}

export interface GetDashboard_libraryItems_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetDashboard_libraryItems {
  __typename: "ContentItem";
  title: string | null;
  image: GetDashboard_libraryItems_image | null;
}

export interface GetDashboard {
  /**
   * Get list of all courses
   */
  courses: GetDashboard_courses[];
  /**
   * Get list of all library_items
   */
  libraryItems: GetDashboard_libraryItems[];
}
