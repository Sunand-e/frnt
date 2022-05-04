/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSection
// ====================================================

export interface UpdateSection_updateSection_section_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdateSection_updateSection_section_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdateSection_updateSection_section_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdateSection_updateSection_section_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdateSection_updateSection_section_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdateSection_updateSection_section_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdateSection_updateSection_section_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: UpdateSection_updateSection_section_children_image | null;
  id: string;
  icon: UpdateSection_updateSection_section_children_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdateSection_updateSection_section_children_users | null;
  _deleted: boolean;
}

export interface UpdateSection_updateSection_section {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: UpdateSection_updateSection_section_image | null;
  id: string;
  icon: UpdateSection_updateSection_section_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdateSection_updateSection_section_users | null;
  _deleted: boolean;
  children: UpdateSection_updateSection_section_children[] | null;
}

export interface UpdateSection_updateSection {
  __typename: "UpdateSectionPayload";
  section: UpdateSection_updateSection_section | null;
}

export interface UpdateSection {
  updateSection: UpdateSection_updateSection | null;
}

export interface UpdateSectionVariables {
  id: string;
  title?: string | null;
  content?: any | null;
  childrenIds?: any | null;
  childrenReorder?: any | null;
  prerequisites?: any | null;
}
