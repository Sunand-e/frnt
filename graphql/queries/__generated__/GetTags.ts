/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTags
// ====================================================

export interface GetTags_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
  _deleted: boolean;
}

export interface GetTags {
  tags: GetTags_tags[];
}
