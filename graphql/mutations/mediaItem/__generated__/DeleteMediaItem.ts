/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteMediaItem
// ====================================================

export interface DeleteMediaItem_deleteMediaItem_mediaItem {
  __typename: "MediaItem";
  id: string;
}

export interface DeleteMediaItem_deleteMediaItem {
  __typename: "DeleteMediaItemPayload";
  mediaItem: DeleteMediaItem_deleteMediaItem_mediaItem | null;
  usage: any[] | null;
  message: string;
}

export interface DeleteMediaItem {
  /**
   * Deletes the media item and if usage of particular media item is present usage key will be true and object will be not deleted
   */
  deleteMediaItem: DeleteMediaItem_deleteMediaItem | null;
}

export interface DeleteMediaItemVariables {
  id: string;
}
