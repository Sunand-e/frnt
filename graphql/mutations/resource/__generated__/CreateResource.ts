/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateResource
// ====================================================

export interface CreateResource_createResource_resource_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CreateResource_createResource_resource_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CreateResource_createResource_resource_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface CreateResource_createResource_resource_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface CreateResource_createResource_resource_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface CreateResource_createResource_resource_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: CreateResource_createResource_resource_tags_image | null;
}

export interface CreateResource_createResource_resource {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: CreateResource_createResource_resource_image | null;
  id: string;
  icon: CreateResource_createResource_resource_icon | null;
  itemType: string;
  mediaItem: CreateResource_createResource_resource_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: CreateResource_createResource_resource_users | null;
  tags: CreateResource_createResource_resource_tags[] | null;
  _deleted: boolean;
}

export interface CreateResource_createResource {
  __typename: "CreateResourcePayload";
  resource: CreateResource_createResource_resource | null;
  message: any;
}

export interface CreateResource {
  createResource: CreateResource_createResource | null;
}

export interface CreateResourceVariables {
  title?: string | null;
  contentType?: string | null;
  content?: any | null;
  settings?: any | null;
  imageId?: string | null;
  mediaItemId?: string | null;
  iconId?: string | null;
}
