/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMediaItems
// ====================================================

export interface GetMediaItems_mediaItems {
  __typename: "MediaItem";
  altText: string | null;
  createdAt: any;
  deletedAt: any | null;
  fileName: string | null;
  mediaType: string | null;
  location: string | null;
  properties: any | null;
  id: string;
}

export interface GetMediaItems {
  /**
   * Get List of Media Items present in current Tenant based on the media_types(image/document/video/audio)
   */
  mediaItems: GetMediaItems_mediaItems[];
}

export interface GetMediaItemsVariables {
  type: any;
}
