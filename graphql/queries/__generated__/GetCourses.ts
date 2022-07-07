/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourses
// ====================================================

export interface GetCourses_courses_image {
  __typename: "MediaItem";
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

export interface GetCourses_courses_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourses_courses_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetCourses_courses_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetCourses_courses_tags_image | null;
  id: string;
}

export interface GetCourses_courses_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourses_courses_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourses_courses_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourses_courses_sections_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetCourses_courses_sections_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetCourses_courses_sections_tags_image | null;
}

export interface GetCourses_courses_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourses_courses_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourses_courses_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourses_courses_sections_children_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetCourses_courses_sections_children_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetCourses_courses_sections_children_tags_image | null;
}

export interface GetCourses_courses_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetCourses_courses_sections_children_image | null;
  id: string;
  icon: GetCourses_courses_sections_children_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourses_courses_sections_children_users | null;
  tags: GetCourses_courses_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface GetCourses_courses_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetCourses_courses_sections_image | null;
  id: string;
  icon: GetCourses_courses_sections_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourses_courses_sections_users | null;
  tags: GetCourses_courses_sections_tags[] | null;
  _deleted: boolean;
  children: GetCourses_courses_sections_children[] | null;
}

export interface GetCourses_courses {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetCourses_courses_image | null;
  id: string;
  icon: GetCourses_courses_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourses_courses_users | null;
  tags: GetCourses_courses_tags[] | null;
  _deleted: boolean;
  sections: GetCourses_courses_sections[] | null;
}

export interface GetCourses {
  /**
   * Get list of all courses
   */
  courses: GetCourses_courses[];
}
