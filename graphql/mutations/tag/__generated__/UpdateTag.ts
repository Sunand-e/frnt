/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTag
// ====================================================

export interface UpdateTag_updateTag_tag_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdateTag_updateTag_tag {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
  image: UpdateTag_updateTag_tag_image | null;
  _deleted: boolean;
}

export interface UpdateTag_updateTag {
  __typename: "UpdateTagPayload";
  tag: UpdateTag_updateTag_tag;
}

export interface UpdateTag {
  updateTag: UpdateTag_updateTag | null;
}

export interface UpdateTagVariables {
  id: string;
  label?: string | null;
  tagType?: string | null;
  mediaItemId?: string | null;
}
