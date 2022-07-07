/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCoursesBasic
// ====================================================

export interface GetCoursesBasic_courses_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCoursesBasic_courses_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCoursesBasic_courses {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetCoursesBasic_courses_image | null;
  id: string;
  icon: GetCoursesBasic_courses_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
}

export interface GetCoursesBasic {
  /**
   * Get list of all courses
   */
  courses: GetCoursesBasic_courses[];
}
