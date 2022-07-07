/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TagFragment
// ====================================================

export interface TagFragment_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface TagFragment {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
  image: TagFragment_image | null;
  _deleted: boolean;
}
