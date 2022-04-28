import { gql } from '@apollo/client';


export const ENROL_USERS_IN_PATHWAYS = gql`
  mutation EnrolUsersInPathways(
    $userIds: [ID!]!,
    $contentItemIds: [ID!]!
  ) {
    enrolUsersInContent(
      input: {
        userIds: $userIds,
        contentItemIds: $contentItemIds
      }
    ) {
      status
    }
  }
`;
