/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDashboard
// ====================================================

export interface GetDashboard_contentItems {
  __typename: "ContentItem";
  title: string | null;
}

export interface GetDashboard {
  /**
   * Get list of all Content_items
   */
  contentItems: GetDashboard_contentItems[];
}
