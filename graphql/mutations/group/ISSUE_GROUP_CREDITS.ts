import { gql } from "@apollo/client";

export const ISSUE_GROUP_CREDITS = gql`
  mutation IssueGroupCredits($groupId: ID!, $creditIncrement: Int!) {
    issueGroupCredits(groupId: $groupId, creditIncrement: $creditIncrement) {
      group {
        id
        creditTotal
      }
    }
  }
`;