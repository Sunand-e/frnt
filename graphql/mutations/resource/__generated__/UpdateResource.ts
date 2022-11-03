/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateResource
// ====================================================

export interface UpdateResource_updateResource_resource_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdateResource_updateResource_resource_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdateResource_updateResource_resource_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface UpdateResource_updateResource_resource_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdateResource_updateResource_resource_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface UpdateResource_updateResource_resource_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: UpdateResource_updateResource_resource_tags_image | null;
}

export interface UpdateResource_updateResource_resource {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: UpdateResource_updateResource_resource_image | null;
  id: string;
  icon: UpdateResource_updateResource_resource_icon | null;
  itemType: string;
  mediaItem: UpdateResource_updateResource_resource_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdateResource_updateResource_resource_users | null;
  tags: UpdateResource_updateResource_resource_tags[] | null;
  _deleted: boolean;
}

export interface UpdateResource_updateResource {
  __typename: "UpdateResourcePayload";
  resource: UpdateResource_updateResource_resource | null;
}

export interface UpdateResource {
  updateResource: UpdateResource_updateResource | null;
}

export interface UpdateResourceVariables {
  id: string;
  title?: string | null;
  content?: any | null;
  settings?: any | null;
  imageId?: string | null;
  mediaItemId?: string | null;
}
