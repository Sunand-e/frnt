/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClientCourse
// ====================================================

export interface ClientCourse_image {
  __typename: "Image";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface ClientCourse_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface ClientCourse_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface ClientCourse {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: ClientCourse_image | null;
  id: string;
  icon: ClientCourse_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  tags: ClientCourse_tags[] | null;
  _deleted: boolean;
}
