/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTag
// ====================================================

export interface CreateTag_createTag_tag {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
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
