/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser_user {
  __typename: "User";
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export interface CreateUser_createUser {
  __typename: "CreateUserPayload";
  user: CreateUser_createUser_user;
}

export interface CreateUser {
  createUser: CreateUser_createUser | null;
}

export interface CreateUserVariables {
  firstName: string;
  lastName: string;
  email: string;
}
