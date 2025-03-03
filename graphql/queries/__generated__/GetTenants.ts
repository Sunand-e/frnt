/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTenants
// ====================================================

export interface GetTenants_tenants_edges_node {
  _deleted: any;
  __typename: "Tenant";
  id: string;
  name: string;
  url: string;
  updatedAt: any;
  createdAt: any;
  shortName: string;
  settings: any;
  logos: any | null;
  active_users: any;
  user_access_courses: any;
  course_access_frequency: any;
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
  tenantReports: GetTenants_tenants;
  tenants: GetTenants_tenants;
}
