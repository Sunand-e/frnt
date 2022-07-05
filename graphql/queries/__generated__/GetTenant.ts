/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTenant
// ====================================================

export interface GetTenant_tenant {
  __typename: "Tenant";
  id: string;
  name: string;
  url: string;
  updatedAt: any;
}

export interface GetTenant {
  tenant: GetTenant_tenant;
}

export interface GetTenantVariables {
  id?: string | null;
}
