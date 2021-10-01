/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUserToGroup
// ====================================================

export interface AddUserToGroup_addUserToGroup_membership_group {
  __typename: "Group";
  id: string;
}

export interface AddUserToGroup_addUserToGroup_membership {
  __typename: "GroupMembership";
  group: AddUserToGroup_addUserToGroup_membership_group | null;
}

export interface AddUserToGroup_addUserToGroup {
  __typename: "AddUserToGroupPayload";
  membership: AddUserToGroup_addUserToGroup_membership;
}

export interface AddUserToGroup {
  addUserToGroup: AddUserToGroup_addUserToGroup | null;
}

export interface AddUserToGroupVariables {
  userId: string;
  isGroupLeader?: boolean | null;
  groupId: string;
}
