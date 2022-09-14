/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMediaItem
// ====================================================

export interface GetMediaItem_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  fileSize: number | null;
  fileName: string | null;
  location: string | null;
  properties: any | null;
  altText: string | null;
  createdAt: any;
  deletedAt: any | null;
}

export interface GetMediaItem {
  /**
   * Get a Media Item present in current Tenant based on the id
   */
  mediaItem: GetMediaItem_mediaItem;
}

export interface GetMediaItemVariables {
  id?: string | null;
}
