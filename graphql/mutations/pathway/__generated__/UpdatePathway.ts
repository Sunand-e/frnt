/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePathway
// ====================================================

export interface UpdatePathway_updatePathway_pathway_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdatePathway_updatePathway_pathway_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdatePathway_updatePathway_pathway_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdatePathway_updatePathway_pathway_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface UpdatePathway_updatePathway_pathway_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: UpdatePathway_updatePathway_pathway_tags_image | null;
  id: string;
}

export interface UpdatePathway_updatePathway_pathway_courses_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdatePathway_updatePathway_pathway_courses_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdatePathway_updatePathway_pathway_courses_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdatePathway_updatePathway_pathway_courses_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface UpdatePathway_updatePathway_pathway_courses_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: UpdatePathway_updatePathway_pathway_courses_tags_image | null;
  id: string;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: UpdatePathway_updatePathway_pathway_courses_sections_tags_image | null;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections_children_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections_children_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: UpdatePathway_updatePathway_pathway_courses_sections_children_tags_image | null;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: UpdatePathway_updatePathway_pathway_courses_sections_children_image | null;
  id: string;
  icon: UpdatePathway_updatePathway_pathway_courses_sections_children_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdatePathway_updatePathway_pathway_courses_sections_children_users | null;
  tags: UpdatePathway_updatePathway_pathway_courses_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface UpdatePathway_updatePathway_pathway_courses_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: UpdatePathway_updatePathway_pathway_courses_sections_image | null;
  id: string;
  icon: UpdatePathway_updatePathway_pathway_courses_sections_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdatePathway_updatePathway_pathway_courses_sections_users | null;
  tags: UpdatePathway_updatePathway_pathway_courses_sections_tags[] | null;
  _deleted: boolean;
  children: UpdatePathway_updatePathway_pathway_courses_sections_children[] | null;
}

export interface UpdatePathway_updatePathway_pathway_courses {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: UpdatePathway_updatePathway_pathway_courses_image | null;
  id: string;
  icon: UpdatePathway_updatePathway_pathway_courses_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdatePathway_updatePathway_pathway_courses_users | null;
  tags: UpdatePathway_updatePathway_pathway_courses_tags[] | null;
  _deleted: boolean;
  sections: UpdatePathway_updatePathway_pathway_courses_sections[] | null;
}

export interface UpdatePathway_updatePathway_pathway {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: UpdatePathway_updatePathway_pathway_image | null;
  id: string;
  icon: UpdatePathway_updatePathway_pathway_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdatePathway_updatePathway_pathway_users | null;
  tags: UpdatePathway_updatePathway_pathway_tags[] | null;
  _deleted: boolean;
  courses: UpdatePathway_updatePathway_pathway_courses[] | null;
}

export interface UpdatePathway_updatePathway {
  __typename: "UpdatePathwayPayload";
  pathway: UpdatePathway_updatePathway_pathway | null;
}

export interface UpdatePathway {
  updatePathway: UpdatePathway_updatePathway | null;
}

export interface UpdatePathwayVariables {
  id: string;
  title?: string | null;
  content?: any | null;
  certificateProperties?: any | null;
  settings?: any | null;
  tags?: TagInput[] | null;
  imageId?: string | null;
  imageUrl?: string | null;
  childrenIds?: any | null;
  prerequisites?: any | null;
}
