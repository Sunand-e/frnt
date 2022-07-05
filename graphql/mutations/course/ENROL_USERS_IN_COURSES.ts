import { gql } from '@apollo/client';


export const ENROL_USERS_IN_COURSES = gql`
  mutation EnrolUsersInCourses(
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
