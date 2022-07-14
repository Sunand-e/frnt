/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTenant
// ====================================================

export interface GetTenant_tenant_children {
  __typename: "Tenant";
  id: string;
  name: string;
  url: string;
  updatedAt: any;
  createdAt: any;
  shortName: string;
}

export interface GetTenant_tenant {
  __typename: "Tenant";
  id: string;
  name: string;
  url: string;
  updatedAt: any;
  createdAt: any;
  shortName: string;
  children: GetTenant_tenant_children[] | null;
}

export interface GetTenant {
  tenant: GetTenant_tenant;
}

export interface GetTenantVariables {
  id: string;
}
