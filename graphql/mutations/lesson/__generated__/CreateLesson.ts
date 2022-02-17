/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateLesson
// ====================================================

export interface CreateLesson_createLesson_lesson_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CreateLesson_createLesson_lesson_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CreateLesson_createLesson_lesson {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: CreateLesson_createLesson_lesson_image | null;
  id: string;
  icon: CreateLesson_createLesson_lesson_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
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
