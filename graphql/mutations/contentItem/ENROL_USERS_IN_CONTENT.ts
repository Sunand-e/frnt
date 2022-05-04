import { gql } from '@apollo/client';


export const ENROL_USERS_IN_CONTENT = gql`
  mutation EnrolUsersInContent(
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
