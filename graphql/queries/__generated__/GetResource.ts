/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetResource
// ====================================================

export interface GetResource_resource_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetResource_resource_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetResource_resource_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetResource_resource_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetResource_resource_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetResource_resource_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetResource_resource_tags_image | null;
}

export interface GetResource_resource {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetResource_resource_image | null;
  id: string;
  icon: GetResource_resource_icon | null;
  itemType: string;
  mediaItem: GetResource_resource_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetResource_resource_users | null;
  tags: GetResource_resource_tags[] | null;
  _deleted: boolean;
}

export interface GetResource {
  /**
   * Get an resources based on your conditions or based on id
   */
  resource: GetResource_resource;
}

export interface GetResourceVariables {
  id: string;
}
