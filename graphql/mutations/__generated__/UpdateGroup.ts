/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateGroup
// ====================================================

export interface UpdateGroup_updateGroup_group_users {
  __typename: "User";
  id: string;
}

export interface UpdateGroup_updateGroup_group {
  __typename: "Group";
  createdAt: any;
  id: string;
  name: string | null;
  updatedAt: any;
  users: UpdateGroup_updateGroup_group_users[];
  _deleted: boolean;
}

export interface UpdateGroup_updateGroup {
  __typename: "UpdateGroupPayload";
  group: UpdateGroup_updateGroup_group;
}

export interface UpdateGroup {
  updateGroup: UpdateGroup_updateGroup | null;
}

export interface UpdateGroupVariables {
  id: string;
  name?: string | null;
  parentId?: string | null;
}
