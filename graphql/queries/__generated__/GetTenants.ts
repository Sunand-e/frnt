/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTenants
// ====================================================

export interface GetTenants_tenants_edges_node {
  __typename: "Tenant";
  id: string;
  name: string;
  url: string;
  updatedAt: any;
  createdAt: any;
  shortName: string;
}

export interface GetTenants_tenants_edges {
  __typename: "TenantEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetTenants_tenants_edges_node | null;
}

export interface GetTenants_tenants {
  __typename: "TenantConnection";
  /**
   * A list of edges.
   */
  edges: (GetTenants_tenants_edges | null)[] | null;
}

export interface GetTenants {
  tenants: GetTenants_tenants;
}
