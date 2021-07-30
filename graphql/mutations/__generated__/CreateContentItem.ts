/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateContentItem
// ====================================================

export interface CreateContentItem_createCourse_contentItem {
  __typename: "ContentItem";
  id: string;
  title: string | null;
}

export interface CreateContentItem_createCourse {
  __typename: "CreateContentItemPayload";
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
  contentItem: CreateContentItem_createCourse_contentItem | null;
}

export interface CreateContentItem {
  createCourse: CreateContentItem_createCourse | null;
}
