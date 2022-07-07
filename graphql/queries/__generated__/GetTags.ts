/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTags
// ====================================================

export interface GetTags_tags_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetTags_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
  image: GetTags_tags_image | null;
  _deleted: boolean;
}

export interface GetTags {
  tags: GetTags_tags[];
}
