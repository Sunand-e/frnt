/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUsersToGroups
// ====================================================

export interface AddUsersToGroups_addUsersToGroups_groups_users_nodes {
  __typename: "User";
  id: string;
}

export interface AddUsersToGroups_addUsersToGroups_groups_users {
  __typename: "GroupUserConnection";
  /**
   * A list of nodes.
   */
  nodes: (AddUsersToGroups_addUsersToGroups_groups_users_nodes | null)[] | null;
}

export interface AddUsersToGroups_addUsersToGroups_groups {
  __typename: "Group";
  id: string;
  name: string | null;
  users: AddUsersToGroups_addUsersToGroups_groups_users;
}

export interface AddUsersToGroups_addUsersToGroups {
  __typename: "AddUsersToGroupsPayload";
  groups: AddUsersToGroups_addUsersToGroups_groups[];
}

export interface AddUsersToGroups {
  addUsersToGroups: AddUsersToGroups_addUsersToGroups | null;
}

export interface AddUsersToGroupsVariables {
  userIds: string[];
  groupIds: string[];
}
