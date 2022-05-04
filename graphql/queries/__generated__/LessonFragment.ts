/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LessonFragment
// ====================================================

export interface LessonFragment_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface LessonFragment_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface LessonFragment_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface LessonFragment {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: LessonFragment_image | null;
  id: string;
  icon: LessonFragment_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: LessonFragment_users | null;
  _deleted: boolean;
}
