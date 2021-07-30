/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCourse
// ====================================================

export interface CreateCourse_createCourse_contentItem {
  __typename: "ContentItem";
  id: string;
  title: string | null;
}

export interface CreateCourse_createCourse {
  __typename: "CreateContentItemPayload";
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
  contentItem: CreateCourse_createCourse_contentItem | null;
}

export interface CreateCourse {
  createCourse: CreateCourse_createCourse | null;
}
