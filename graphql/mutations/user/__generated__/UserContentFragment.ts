/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserContentFragment
// ====================================================

export interface UserContentFragment_contentItem {
  __typename: "ContentItem";
  id: string;
  itemType: string;
}

export interface UserContentFragment_user {
  __typename: "User";
  id: string;
}

export interface UserContentFragment {
  __typename: "UserContent";
  status: string | null;
  score: number | null;
  updatedAt: any;
  completed: boolean | null;
  properties: any | null;
  lastVisited: any | null;
  firstVisited: any | null;
  contentItem: UserContentFragment_contentItem;
  user: UserContentFragment_user;
}
