/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTag
// ====================================================

export interface GetTag_tag {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
  _deleted: boolean;
}

export interface GetTag {
  tag: GetTag_tag;
}

export interface GetTagVariables {
  id: string;
}
