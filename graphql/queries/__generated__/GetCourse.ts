/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourse
// ====================================================

export interface GetCourse_course_image {
  __typename: "Image";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourse_course_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourse_course_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface GetCourse_course {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: GetCourse_course_image | null;
  id: string;
  icon: GetCourse_course_icon | null;
  itemType: string;
  order: number | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  tags: GetCourse_course_tags[] | null;
}

export interface GetCourse {
  /**
   * Get an courses based on your conditions or based on id
   */
  course: GetCourse_course[];
}

export interface GetCourseVariables {
  id: string;
}
