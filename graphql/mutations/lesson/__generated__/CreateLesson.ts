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

export interface CreateLesson_createLesson_lesson_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface CreateLesson_createLesson_lesson_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface CreateLesson_createLesson_lesson_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: CreateLesson_createLesson_lesson_tags_image | null;
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
  users: CreateLesson_createLesson_lesson_users | null;
  tags: CreateLesson_createLesson_lesson_tags[] | null;
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
  title?: string | null;
  content?: any | null;
  contentType?: string | null;
  parentIds?: any | null;
  prerequisites?: any | null;
  imageId?: string | null;
  iconId?: string | null;
}
