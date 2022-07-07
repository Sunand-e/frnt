/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTenants
// ====================================================

export interface GetTenants_tenants {
  __typename: "Tenant";
  id: string;
  name: string;
  url: string;
  updatedAt: any;
}

export interface GetTenants {
  tenants: GetTenants_tenants[];
}
