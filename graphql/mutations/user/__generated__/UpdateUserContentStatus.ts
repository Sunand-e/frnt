/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserContentStatus
// ====================================================

export interface UpdateUserContentStatus_updateUserContentStatus_userContents_contentItem {
  __typename: "ContentItem";
  id: string;
  itemType: string;
}

export interface UpdateUserContentStatus_updateUserContentStatus_userContents_user {
  __typename: "User";
  id: string;
}

export interface UpdateUserContentStatus_updateUserContentStatus_userContents {
  __typename: "UserContent";
  status: string | null;
  score: number | null;
  updatedAt: any;
  completed: boolean | null;
  properties: any | null;
  lastVisited: any | null;
  firstVisited: any | null;
  contentItem: UpdateUserContentStatus_updateUserContentStatus_userContents_contentItem;
  user: UpdateUserContentStatus_updateUserContentStatus_userContents_user;
}

export interface UpdateUserContentStatus_updateUserContentStatus {
  __typename: "UserContentStatusUpdatePayload";
  userContents: UpdateUserContentStatus_updateUserContentStatus_userContents[] | null;
}

export interface UpdateUserContentStatus {
  updateUserContentStatus: UpdateUserContentStatus_updateUserContentStatus | null;
}

export interface UpdateUserContentStatusVariables {
  userId?: string | null;
  contentItemId: string;
  status?: string | null;
  lastVisited?: any | null;
  firstVisited?: any | null;
  score?: number | null;
  visits?: number | null;
  completed?: boolean | null;
}
