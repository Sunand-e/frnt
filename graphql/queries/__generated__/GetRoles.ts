/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRoles
// ====================================================

export interface GetRoles_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
  _deleted: boolean;
}

export interface GetRoles {
  /**
   * Get list of all roles
   */
  roles: GetRoles_roles[];
}
