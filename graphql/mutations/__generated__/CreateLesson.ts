/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateLesson
// ====================================================

export interface CreateLesson_createLesson_lesson {
  __typename: "ContentItem";
  id: string;
}

export interface CreateLesson_createLesson {
  __typename: "CreateLessonPayload";
  lesson: CreateLesson_createLesson_lesson | null;
  message: any;
}

export interface CreateLesson {
  createLesson: CreateLesson_createLesson | null;
}

export interface CreateLessonVariables {
  title: string;
  content?: any | null;
  parentIds?: any | null;
  prerequisites?: any | null;
  imageId?: string | null;
  iconId?: string | null;
}
