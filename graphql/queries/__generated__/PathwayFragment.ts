/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PathwayFragment
// ====================================================

export interface PathwayFragment_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface PathwayFragment_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface PathwayFragment_courses_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface PathwayFragment_courses_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface PathwayFragment_courses_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface PathwayFragment_courses_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface PathwayFragment_courses_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface PathwayFragment_courses_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface PathwayFragment_courses_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: PathwayFragment_courses_sections_children_image | null;
  id: string;
  icon: PathwayFragment_courses_sections_children_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
}

export interface PathwayFragment_courses_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: PathwayFragment_courses_sections_image | null;
  id: string;
  icon: PathwayFragment_courses_sections_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
  children: PathwayFragment_courses_sections_children[] | null;
}

export interface PathwayFragment_courses_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface PathwayFragment_courses {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: PathwayFragment_courses_image | null;
  id: string;
  icon: PathwayFragment_courses_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
  sections: PathwayFragment_courses_sections[] | null;
  tags: PathwayFragment_courses_tags[] | null;
}

export interface PathwayFragment_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface PathwayFragment {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: PathwayFragment_image | null;
  id: string;
  icon: PathwayFragment_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
  courses: PathwayFragment_courses[] | null;
  tags: PathwayFragment_tags[] | null;
}
