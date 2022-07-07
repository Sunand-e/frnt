/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTag
// ====================================================

export interface GetTag_tag_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetTag_tag {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
  image: GetTag_tag_image | null;
  _deleted: boolean;
}

export interface GetTag {
  tag: GetTag_tag;
}

export interface GetTagVariables {
  id: string;
}
