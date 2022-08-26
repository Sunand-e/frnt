/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMediaItem
// ====================================================

export interface UpdateMediaItem_updateMediaItem_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  fileName: string | null;
  location: string | null;
  properties: any | null;
  altText: string | null;
  createdAt: any;
  deletedAt: any | null;
}

export interface UpdateMediaItem_updateMediaItem {
  __typename: "UpdateMediaItemPayload";
  mediaItem: UpdateMediaItem_updateMediaItem_mediaItem;
}

export interface UpdateMediaItem {
  /**
   * Update a Media Item present in current Tenant based on the id and other fields to be updated
   */
  updateMediaItem: UpdateMediaItem_updateMediaItem | null;
}

export interface UpdateMediaItemVariables {
  id: string;
  title?: string | null;
  properties?: any | null;
  altText?: string | null;
}
