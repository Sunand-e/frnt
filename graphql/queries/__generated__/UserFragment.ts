/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserFragment
// ====================================================

export interface UserFragment_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface UserFragment {
  __typename: "User";
  createdAt: any;
  email: string;
  firstName: string | null;
  fullName: string | null;
  id: string;
  lastName: string | null;
  status: string;
  updatedAt: any;
  userType: string | null;
  profileImageUrl: string | null;
  roles: UserFragment_roles[] | null;
}
