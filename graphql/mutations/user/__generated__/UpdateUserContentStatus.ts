/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserContentStatus
// ====================================================

export interface UpdateUserContentStatus_updateUserContentStatus_userContent {
  __typename: "UserContent";
  id: string;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any;
  updatedAt: any;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface UpdateUserContentStatus_updateUserContentStatus_ancestorUserContents {
  __typename: "UserContent";
  id: string;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any;
  updatedAt: any;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface UpdateUserContentStatus_updateUserContentStatus {
  __typename: "UserContentStatusUpdatePayload";
  userContent: UpdateUserContentStatus_updateUserContentStatus_userContent;
  ancestorUserContents: UpdateUserContentStatus_updateUserContentStatus_ancestorUserContents[] | null;
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
