/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTagsFull
// ====================================================

export interface GetTagsFull_tags_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetTagsFull_tags_courses {
  __typename: "ContentItem";
  id: string;
}

export interface GetTagsFull_tags_libraryItems {
  __typename: "ContentItem";
  id: string;
}

export interface GetTagsFull_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
  image: GetTagsFull_tags_image | null;
  _deleted: boolean;
  courses: GetTagsFull_tags_courses[] | null;
  libraryItems: GetTagsFull_tags_libraryItems[] | null;
}

export interface GetTagsFull {
  tags: GetTagsFull_tags[];
}
