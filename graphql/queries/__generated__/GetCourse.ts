/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourse
// ====================================================

export interface GetCourse_course_image {
  __typename: "MediaItem";
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

export interface GetCourse_course_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCourse_course_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourse_course_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetCourse_course_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetCourse_course_tags_image | null;
}

export interface GetCourse_course_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourse_course_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourse_course_sections_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCourse_course_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourse_course_sections_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetCourse_course_sections_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetCourse_course_sections_tags_image | null;
}

export interface GetCourse_course_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourse_course_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourse_course_sections_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCourse_course_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourse_course_sections_children_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetCourse_course_sections_children_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetCourse_course_sections_children_tags_image | null;
}

export interface GetCourse_course_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetCourse_course_sections_children_image | null;
  id: string;
  icon: GetCourse_course_sections_children_icon | null;
  itemType: string;
  mediaItem: GetCourse_course_sections_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourse_course_sections_children_users | null;
  tags: GetCourse_course_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface GetCourse_course_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetCourse_course_sections_image | null;
  id: string;
  icon: GetCourse_course_sections_icon | null;
  itemType: string;
  mediaItem: GetCourse_course_sections_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourse_course_sections_users | null;
  tags: GetCourse_course_sections_tags[] | null;
  _deleted: boolean;
  children: GetCourse_course_sections_children[] | null;
}

export interface GetCourse_course {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetCourse_course_image | null;
  id: string;
  icon: GetCourse_course_icon | null;
  itemType: string;
  mediaItem: GetCourse_course_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourse_course_users | null;
  tags: GetCourse_course_tags[] | null;
  _deleted: boolean;
  sections: GetCourse_course_sections[] | null;
}

export interface GetCourse {
  /**
   * Get an courses based on your conditions or based on id
   */
  course: GetCourse_course;
}

export interface GetCourseVariables {
  id: string;
}
