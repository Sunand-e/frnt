/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateGroup
// ====================================================

export interface CreateGroup_createGroup_group_users {
  __typename: "User";
  id: string;
}

export interface CreateGroup_createGroup_group {
  __typename: "Group";
  createdAt: any;
  id: string;
  name: string | null;
  updatedAt: any;
  users: CreateGroup_createGroup_group_users[];
}

export interface CreateGroup_createGroup {
  __typename: "CreateGroupPayload";
  group: CreateGroup_createGroup_group;
}

export interface CreateGroup {
  createGroup: CreateGroup_createGroup | null;
}

export interface CreateGroupVariables {
  name: string;
  parentId?: string | null;
}
