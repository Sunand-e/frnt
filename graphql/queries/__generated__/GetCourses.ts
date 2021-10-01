/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourses
// ====================================================

export interface GetCourses_courses_image {
  __typename: "Image";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourses_courses_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourses_courses_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface GetCourses_courses {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: GetCourses_courses_image | null;
  id: string;
  icon: GetCourses_courses_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
  tags: GetCourses_courses_tags[] | null;
}

export interface GetCourses {
  /**
   * Get list of all courses
   */
  courses: GetCourses_courses[];
}
