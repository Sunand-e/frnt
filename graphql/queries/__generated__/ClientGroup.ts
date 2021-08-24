/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClientGroup
// ====================================================

export interface ClientGroup_users {
  __typename: "User";
  id: string;
}

export interface ClientGroup {
  __typename: "Group";
  createdAt: any;
  id: string;
  name: string | null;
  updatedAt: any;
  users: ClientGroup_users[];
  _deleted: boolean;
}
