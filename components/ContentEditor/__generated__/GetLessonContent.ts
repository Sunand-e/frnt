/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLessonContent
// ====================================================

export interface GetLessonContent_lesson {
  __typename: "ContentItem";
  content: any | null;
}

export interface GetLessonContent {
  /**
   * Get an lessons based on your conditions or based on id
   */
  lesson: GetLessonContent_lesson;
}

export interface GetLessonContentVariables {
  id: string;
}
