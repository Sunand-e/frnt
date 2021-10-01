/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupFragment
// ====================================================

export interface GroupFragment_users {
  __typename: "User";
  id: string;
}

export interface GroupFragment {
  __typename: "Group";
  createdAt: any;
  id: string;
  name: string | null;
  updatedAt: any;
  users: GroupFragment_users[];
  _deleted: boolean;
}
