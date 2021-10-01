/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSection
// ====================================================

export interface CreateSection_createSection_section_image {
  __typename: "Image";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CreateSection_createSection_section_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CreateSection_createSection_section_children_image {
  __typename: "Image";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CreateSection_createSection_section_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CreateSection_createSection_section_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: CreateSection_createSection_section_children_image | null;
  id: string;
  icon: CreateSection_createSection_section_children_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
}

export interface CreateSection_createSection_section {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: CreateSection_createSection_section_image | null;
  id: string;
  icon: CreateSection_createSection_section_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
  children: CreateSection_createSection_section_children[] | null;
}

export interface CreateSection_createSection {
  __typename: "CreateSectionPayload";
  section: CreateSection_createSection_section | null;
  message: any;
}

export interface CreateSection {
  createSection: CreateSection_createSection | null;
}

export interface CreateSectionVariables {
  title: string;
  content?: any | null;
  childrenIds?: any | null;
  parentIds?: any | null;
  prerequisites?: any | null;
}
