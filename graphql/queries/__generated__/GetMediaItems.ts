/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMediaItems
// ====================================================

export interface GetMediaItems_mediaItems {
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

export interface GetMediaItems {
  /**
   * Get List of Media Items present in current Tenant based on the media_types(image/document/video/audio)
   */
  mediaItems: GetMediaItems_mediaItems[];
}

export interface GetMediaItemsVariables {
  where?: any | null;
}
