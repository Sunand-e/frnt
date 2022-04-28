import { gql } from '@apollo/client';


export const ENROL_USERS_IN_COURSES = gql`
  mutation EnrolUsersInCourses(
    $userIds: [ID!]!,
    $contentItemIds: [ID!]!
  ) {
    enrolUsersInCourses(
      input: {
        userIds: $userIds,
        contentItemIds: $contentItemIds
      }
    ) {
      status
    }
  }
`;
