/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTag
// ====================================================

export interface CreateTag_createTag_tag_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CreateTag_createTag_tag {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
  image: CreateTag_createTag_tag_image | null;
  _deleted: boolean;
}

export interface CreateTag_createTag {
  __typename: "CreateTagPayload";
  tag: CreateTag_createTag_tag;
}

export interface CreateTag {
  createTag: CreateTag_createTag | null;
}

export interface CreateTagVariables {
  label: string;
  tagType: string;
}
