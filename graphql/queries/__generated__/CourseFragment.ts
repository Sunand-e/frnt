/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CourseFragment
// ====================================================

export interface CourseFragment_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CourseFragment_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CourseFragment_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CourseFragment_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CourseFragment_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CourseFragment_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CourseFragment_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: CourseFragment_sections_children_image | null;
  id: string;
  icon: CourseFragment_sections_children_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
}

export interface CourseFragment_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: CourseFragment_sections_image | null;
  id: string;
  icon: CourseFragment_sections_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
  children: CourseFragment_sections_children[] | null;
}

export interface CourseFragment_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface CourseFragment {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: CourseFragment_image | null;
  id: string;
  icon: CourseFragment_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
  sections: CourseFragment_sections[] | null;
  tags: CourseFragment_tags[] | null;
}
