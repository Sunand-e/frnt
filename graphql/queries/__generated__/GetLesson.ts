/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLesson
// ====================================================

export interface GetLesson_lesson_image {
  __typename: "Image";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetLesson_lesson_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetLesson_lesson {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: GetLesson_lesson_image | null;
  id: string;
  icon: GetLesson_lesson_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
}

export interface GetLesson {
  /**
   * Get an lessons based on your conditions or based on id
   */
  lesson: GetLesson_lesson;
}

export interface GetLessonVariables {
  id: string;
}
