/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentFragment
// ====================================================

export interface ContentFragment_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface ContentFragment_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface ContentFragment_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface ContentFragment {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: ContentFragment_image | null;
  id: string;
  icon: ContentFragment_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: ContentFragment_users | null;
  _deleted: boolean;
}
