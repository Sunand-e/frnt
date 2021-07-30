/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUserToGroup
// ====================================================

export interface AddUserToGroup_createCourse_contentItem {
  __typename: "ContentItem";
  id: string;
  title: string | null;
}

export interface AddUserToGroup_createCourse {
  __typename: "CreateContentItemPayload";
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
  contentItem: AddUserToGroup_createCourse_contentItem | null;
}

export interface AddUserToGroup {
  createCourse: AddUserToGroup_createCourse | null;
}
