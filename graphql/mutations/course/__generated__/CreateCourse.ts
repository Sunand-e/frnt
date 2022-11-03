/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCourse
// ====================================================

export interface CreateCourse_createCourse_course_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CreateCourse_createCourse_course_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CreateCourse_createCourse_course_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface CreateCourse_createCourse_course_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface CreateCourse_createCourse_course_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface CreateCourse_createCourse_course_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: CreateCourse_createCourse_course_tags_image | null;
}

export interface CreateCourse_createCourse_course_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CreateCourse_createCourse_course_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CreateCourse_createCourse_course_sections_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface CreateCourse_createCourse_course_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface CreateCourse_createCourse_course_sections_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface CreateCourse_createCourse_course_sections_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: CreateCourse_createCourse_course_sections_tags_image | null;
}

export interface CreateCourse_createCourse_course_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CreateCourse_createCourse_course_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CreateCourse_createCourse_course_sections_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface CreateCourse_createCourse_course_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface CreateCourse_createCourse_course_sections_children_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface CreateCourse_createCourse_course_sections_children_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: CreateCourse_createCourse_course_sections_children_tags_image | null;
}

export interface CreateCourse_createCourse_course_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: CreateCourse_createCourse_course_sections_children_image | null;
  id: string;
  icon: CreateCourse_createCourse_course_sections_children_icon | null;
  itemType: string;
  mediaItem: CreateCourse_createCourse_course_sections_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: CreateCourse_createCourse_course_sections_children_users | null;
  tags: CreateCourse_createCourse_course_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface CreateCourse_createCourse_course_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: CreateCourse_createCourse_course_sections_image | null;
  id: string;
  icon: CreateCourse_createCourse_course_sections_icon | null;
  itemType: string;
  mediaItem: CreateCourse_createCourse_course_sections_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: CreateCourse_createCourse_course_sections_users | null;
  tags: CreateCourse_createCourse_course_sections_tags[] | null;
  _deleted: boolean;
  children: CreateCourse_createCourse_course_sections_children[] | null;
}

export interface CreateCourse_createCourse_course {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: CreateCourse_createCourse_course_image | null;
  id: string;
  icon: CreateCourse_createCourse_course_icon | null;
  itemType: string;
  mediaItem: CreateCourse_createCourse_course_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: CreateCourse_createCourse_course_users | null;
  tags: CreateCourse_createCourse_course_tags[] | null;
  _deleted: boolean;
  sections: CreateCourse_createCourse_course_sections[] | null;
}

export interface CreateCourse_createCourse {
  __typename: "CreateCoursePayload";
  course: CreateCourse_createCourse_course | null;
  message: any;
}

export interface CreateCourse {
  createCourse: CreateCourse_createCourse | null;
}

export interface CreateCourseVariables {
  title: string;
  content?: any | null;
  certificateProperties?: any | null;
  certificateTemplateId?: string | null;
  sections?: any | null;
  settings?: any | null;
  tags?: TagInput[] | null;
  imageId?: string | null;
  imageUrl?: string | null;
  prerequisites?: any | null;
}
