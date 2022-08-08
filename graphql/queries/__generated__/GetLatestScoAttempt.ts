/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLatestScoAttempt
// ====================================================

export interface GetLatestScoAttempt_latestScoAttempt {
  __typename: "ScoAttempt";
  data: any | null;
  attempt: number | null;
}

export interface GetLatestScoAttempt {
  /**
   * Get a user SCO attempt based on module_id, content_item_id and user_id
   */
  latestScoAttempt: GetLatestScoAttempt_latestScoAttempt;
}

export interface GetLatestScoAttemptVariables {
  courseId: string;
  scormModuleId: string;
}
